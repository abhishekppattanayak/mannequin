import { db } from "../server.ts";

interface Chat {
  userId: string,
  chatId: string,
  title: string, 
  chat: JSON
}

function createChatObject (userId:string, chatId:string, title:string, chat:JSON) : Chat {
  return {userId, chatId, title, chat};
}

export async function getChats (userId: string) : Promise<any> {
  try {
    const data = await db.collection("users").findOne({userId});
    if (!data)
        throw new Error("No such user found")
    return data;
  }
  catch (error: any) {
    return Promise.reject("Error" + error.message)
  }
}

export function addChat (userId: string, title:string, chat:string) : Promise<string> {
  return new Promise((resolve, reject) => {

    try {
      const chatId = crypto.randomUUID();
      db.collection("chats").insertOne(createChatObject(userId, chatId, title, JSON.parse(chat)));
      resolve("Successful");
    }
    catch {
      reject("Error! Operation not performed");
    }

  });
}