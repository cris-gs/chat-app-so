import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img 
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : data.user.photoURL
              }
              alt="" 
            />
            <span>Just now</span>
        </div>
        <div className={`${message.senderId !== currentUser.uid ? "messageContent" : "owner-messageContent"}`}>
          <p>{message.text}</p>
          {message.type === 'image' && <img src={message.file} alt="" />}
          {message.type === 'video' && <video src={message.file} controls></video>}
          {message.type === 'audio' && <audio src={message.file} controls></audio>}
        </div>
    </div>
  )
}
