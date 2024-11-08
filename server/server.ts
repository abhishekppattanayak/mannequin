import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { MongoClient } from "npm:mongodb";
import { getChats } from "./controllers/chats.ts";

const PORT = 8000;
const DATABASE_URL = Deno.env.get("DATABASE_URL") || "";

const router = new Router();
const app = new Application();

const client = new MongoClient(DATABASE_URL);

let db: any;

router.get("/", async (ctx) => {
  try {

    const text = await Deno.readTextFile("./index.html");
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body = text;
    
  } catch (err) {

    console.error("Error reading index.html:", err);
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error: Could not load index.html.";

  }
});

router.get("/chats/:userId", async (ctx) => {
  try {

    const userId = ctx.params.userId;
    const data = await getChats(userId);
    ctx.response.status = 200;
    ctx.response.body = data;

  } catch (err: any) {

    console.error("Error fetching chats:", err);
    ctx.response.status = 500;
    ctx.response.body = JSON.stringify({
      message: "Server Error",
      details: err.message || "Unknown error",
    });

  }
});

router.use((ctx) => {
  ctx.response.status = 404;
  ctx.response.body = JSON.stringify({
    message: "No route found",
  });
});

app.use(async (ctx, next) => {
  try {

    await next();

  } catch (err) {

    console.error("Unhandled error:", err);
    ctx.response.status = 501;
    ctx.response.body = "Internal Server Error.";
    
  }
});

async function start() {
  try {

    await client.connect();
    db = client.db("mannequin");
    console.log("Connected to MongoDB database.");

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen({ port: PORT });
    console.log(`Server is running on http://localhost:${PORT}`);

  } catch (error: any) {

    console.error("Server could not start.");
    console.error(error.message);
    Deno.exit(1);

  }
}

export { db }

start();
