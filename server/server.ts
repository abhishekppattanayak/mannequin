import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { MongoClient } from "npm:mongodb";
import { getChats } from "./controllers/chats.ts";
import InterfaceUser from "./interfaces/user.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const PORT = 8000;
const DATABASE_URL = Deno.env.get("DATABASE_URL") || "";

const router = new Router();
const app = new Application();

const client = new MongoClient(DATABASE_URL);
const databaseName = "mannequin";


// Defining commonly used databases and collections
let db: any;
let users: any;
let chats: any;

router.get("/", async (ctx) => {
  try {

    const text = await Deno.readTextFile("./index.html");
    ctx.response.status = 200
    ctx.response.headers.set("Content-Type", "text/html");
    ctx.response.body = text;
    
  } catch (error: any) {

    ctx.response.status = 500;
    ctx.response.body = {
      message: "500 Internal Server Error.",
      description: error.message
    };

  }
});

router.get("/chats/", async (ctx) => {
  try {

    const formData = await ctx.request.body.formData()
    const userId: FormDataEntryValue | undefined = formData.get("userId") || undefined;
    if (!userId) {
      const data = await getChats(userId);
    }
    else {
      ctx.response.status = 400
      ctx.response.body = {
        message: "400 Bad Request.",
        description: "A `userId` key not present in the request's form-data."
      }
    }

    
    // todo: implement a function to retrieve chat history from database

  } catch (error: any) {
    ctx.response.status = 500;
    ctx.response.body = JSON.stringify({
      message: "500 Internal Server Error.",
      description: error.message || "Unknown error",
    });

  }
});

router.post("/user/new", async (ctx) => {
  const data = await ctx.request.body.formData()
  const userId = data.get("userId") || undefined;
  const name = data.get("name") || undefined;
  const pronouns = data.get("pronouns") || undefined;

  if (!userId) {
    ctx.response.status = 400 ;
    ctx.response.body = {
      message: "400 Bad Request.",
      description: "A `userId` key not present in the request's form-data."
    }
  }

  try {

    await users.insertOne({
      userId: userId,
      name: name,
      pronouns: pronouns,
    })

    ctx.response.status = 200
    ctx.response.body = { 
      message: "New user created.",
      description: `A user with id ${userId} was created.`
    }
  } catch (error: any) {
    ctx.response.status = 501
    ctx.response.body = {
      message: "501 Internal Server Error.",
      description: error.message
    }
  }
});

router.get('/user/:userId', async (ctx)=>{
  const userId = ctx.params.userId;

  try {
    const user = await users.findOne({userId: userId})
    
    ctx.response.status = 200;
    ctx.response.body = {
      messsage: "200 OK.",
      user: user,
    }
  }
  catch (error: any) {
    ctx.response.status = 501;
    ctx.response.body = {
      message: "501 Internal Server Error.",
      description: error.message
    }
  }
  
})

router.use((ctx) => {
  ctx.response.status = 404;
  ctx.response.body = JSON.stringify({
    message: "Not Found",
  });
});

app.use(async (ctx, next) => {
  try {

    await next();

  } catch (error: any) {

    console.error("Unhandled error:", error);
    ctx.response.status = 501;
    ctx.response.body = {
      message: "501 Internal Server Error.",
      description: error.message
    }
    
  }
});

async function start() {
  try {

    await client.connect();
    db = client.db(databaseName);
    console.log("Connected to MongoDB database.");
    users = db.collection("users");
    chats = db.collection("chats");

    app.use(oakCors());
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen({ port: PORT });
    console.log(`Server is running on http://localhost:${PORT}`);

  } catch (error: any) {

    console.error("Server could not start.");
    console.error(error.message);
    
  }
}

export { db, users, chats }

start();
