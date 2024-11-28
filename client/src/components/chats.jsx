import { useState, useEffect } from "react";

export default function Chats ({userDetails}) {

  // const [chats, setChats] = useState([])

  // useEffect(() => {}, []);

  return (
    <section>
      <b className="text-xl" >Chats</b>
      <ul>
      {
        // chats.map((chat, index) => <li key={index}>{chat.title}</li>)
      }
      </ul>
    </section>
  )
}