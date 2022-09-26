import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import { Message } from "./Message";
import { ModalOptions } from "./modals/ModalOptions";

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
      <ModalOptions/>
        {Object.entries(messages)?.sort((a,b)=>a[1].date - b[1].date).map( message => (
          <Message message={message[1]} key={message[0]} />
        ))}
    </div>
  )
}
