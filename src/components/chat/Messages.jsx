import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { Message } from "./Message";

export const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })
  
    return () => {
      unSub()
    }
  }, [data.chatId]);

  return (
    <div className="messages">
        {messages.map( message => (
          <Message message={message} key={message.id} />
        ))}
    </div>
  )
}
