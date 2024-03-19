import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = new Hono();
app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/user/post/", async (c) => {
  try {
    const data = await c.req.json();
    const newUser = await prisma.user.create({
      data: data,
    });
    return c.json({
      createdUser: newUser,
    });
  } catch (e: any) {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
});

app.post("/user/get/", async (c) => {
  try {
    const { id } = await c.req.json();
    return c.json(
      await prisma.user.findFirst({
        where: {
          id: id,
        },
      })
    );
  } catch (e: any) {
    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
