import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";
import { cors } from "hono/cors";
const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono ashif!");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", postRouter);
app.get("/*", async (c) => {
  return c.text("Page Doesnt Exist");
});

export default app;
