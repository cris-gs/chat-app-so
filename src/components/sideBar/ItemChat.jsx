import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

export const ItemChat = () => {

  const [chats, setChats] = useState([]);

  const currentUser = {
    displayName: "Cristopher",
    email: "cristophergs2001@gmail.com",
    photoURL: "https://yt3.ggpht.com/yti/AJo0G0laMUi3ob58OtLwqWkRRTfQKsg_3Z_scaLIlc1_9w=s88-c-k-c0x00ffffff-no-rj-mo",
    uid: "nsJY2mrccVLGjEC8Y1ER"
  }
  //const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user});
    
    if(window.innerWidth<=480){
      document.getElementById('sidebar').style.display = 'none';
      document.getElementById('chat').style.display = 'block';
    }
  }

  return (
    <div className="itemChat">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat => (
        <div 
          className="userChat" 
          key={chat[0]} 
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img className="search-image" src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
