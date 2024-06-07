import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "hono/utils/jwt";
import { createPostSchema, updatePostSchema } from "@ashif18/medium-common";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: number;
  };
}>();

// add a authentication middleware
postRouter.use("*", async (c, next) => {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json(
      {
        msg: "no token exist",
      },
      411
    );
  } else {
    const { id } = await Jwt.verify(token, c.env.JWT_SECRET);
    c.set("userId", id);
    await next();
  }
});

// routes

postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success, data, error } = createPostSchema.safeParse(body);
  if (success) {
    try {
      await prisma.post.create({
        data: {
          authorId: userId,
          title: data.title,
          content: data.content,
          thumbnail: data.thumbnail,
          published: true,
        },
      });
      return c.json({
        msg: "post created successfully",
      });
    } catch (error) {
      return c.json({
        msg: "Blog not created",
        PrismaError: error,
      });
    }
  } else {
    return c.json(
      {
        msg: "wrong inputs",
        msgErr: error,
      },
      411
    );
  }
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success, data } = updatePostSchema.safeParse(body);
  if (success) {
    try {
      await prisma.post.update({
        where: {
          id: data.id,
          authorId: userId,
        },
        data: {
          title: data.title,
          content: data.content,
          thumbnail: data.thumbnail,
          published: true,
        },
      });
      return c.json({
        msg: "post Updated successfully",
      });
    } catch (error) {
      return c.json({
        msg: "Blog not created",
        PrismaError: error,
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

postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const allPost = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      thumbnail: true,
      updatedAt: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return c.json({
    allPost,
  });
});

postRouter.get("/userblog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  console.log("this is id " + userId);
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        post: true,
      },
    });
    return c.json(
      {
        posts: result?.post,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        msg: "User Not Found",
      },
      411
    );
  }
});

postRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        content: true,
        id: true,
        thumbnail: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!getPost) {
      return c.json({
        msg: "Post Doesnt exist",
      });
    }
    return c.json({
      post: getPost,
    });
  } catch (error) {
    return c.json({
      msg: "post not found with the given id",
      prismaError: error,
    });
  }
});

postRouter.delete("/del", async (c) => {
  const { id } = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
        authorId: userId,
      },
    });
    return c.json({
      msg: "Post Deleted Successfully",
    });
  } catch (error) {
    return c.json(
      {
        msg: "Post Doen't Exist",
      },
      411
    );
  }
});
