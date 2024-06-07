import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "hono/utils/jwt";
import { z } from "zod";
import { signUpSchema, signInSchema } from "@ashif18/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/me", async (c) => {
  const token = c.req.header("Authorization");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  if (!token) {
    return c.json(
      {
        msg: "no token exist",
      },
      411
    );
  } else {
    try {
      await Jwt.verify(token, c.env.JWT_SECRET);
      return c.json({
        msg: "proceed",
      });
    } catch (error) {
      return c.json(
        {
          msg: "Invalid Token",
        },
        411
      );
    }
  }
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success, data } = signUpSchema.safeParse(body);
  if (success) {
    try {
      const user = await prisma.user.create({
        data,
      });
      const jwt = await Jwt.sign({ id: user.id }, c.env.JWT_SECRET);
      console.log(jwt);
      return c.json(
        {
          msg: "user created successfully",
          token: jwt,
          username: user.username,
          email: user.email,
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          prismaError: "User Already Exist Try different Username and Email",
        },
        403
      );
    }
  } else {
    return c.json(
      {
        msg: "Wrong Inputs",
      },
      411
    );
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success, data } = signInSchema.safeParse(body);
  if (success) {
    try {
      const ifExist = await prisma.user.findUnique({
        where: data,
      });

      console.log(ifExist);
      if (!ifExist) {
        return c.json(
          {
            msg: "user doesn't exist with given credentials",
          },
          403
        );
      } else {
        const jwt = await Jwt.sign({ id: ifExist.id }, c.env.JWT_SECRET);
        return c.json({
          msg: "user Signed in",
          token: jwt,
          username: ifExist.username,
          email: ifExist.email,
        });
      }
    } catch (e) {
      return c.json({
        msg: "please check the inputs while sending",
        prismaError: e,
      });
    }
  } else {
    return c.json(
      {
        msg: "wrong inputs",
      },
      411
    );
  }
});
