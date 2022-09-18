import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";

export const Message = ({ message }) => {

  const currentUser = {
    displayName: "Cristopher",
    email: "cristophergs2001@gmail.com",
    photoURL: "https://yt3.ggpht.com/yti/AJo0G0laMUi3ob58OtLwqWkRRTfQKsg_3Z_scaLIlc1_9w=s88-c-k-c0x00ffffff-no-rj-mo",
    uid: "nsJY2mrccVLGjEC8Y1ER"
  }
  //const { currentUser } = useContext(AuthContext);
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
          {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}
