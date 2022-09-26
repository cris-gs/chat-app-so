import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { WindowContext } from "../../context/WindowContext";
import { db } from "../../firebase";


export const ItemChat = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const { setStayWindow } = useContext(WindowContext);

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


  /* const displayWindowSize = () => {
    if(window.innerWidth>581){
      setStayWindow({
          sidebar: true,
          chat: true  
      })
    }else{
      setStayWindow({ sidebar: true, chat: false });
      //document.getElementById("chat").style.display="block";
    }
  }
    
  // Attaching the event listener function to window's resize event
  window.addEventListener("resize", displayWindowSize()); */

  const handleSelect = (user, lastMessage) => {
    dispatch({ type: "CHANGE_USER", payload: {user, lastMessage}});

    if(window.innerWidth>581){
      setStayWindow({
          sidebar: true,
          chat: true  
      })
    }else{
      setStayWindow({ sidebar: false, chat:true });
      document.getElementById("chat").style.display="block";
    }
    
  }

  const decrypt = (text) => {
    if (!!text) {
      const decryptedMessage = CryptoJS.AES.decrypt(text, '@pTSCA42vm94yl4EE4Tjb').toString(CryptoJS.enc.Utf8);
      return decryptedMessage;
    }
  }

  return (
    <div className="itemChat">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat => (
        <div 
          className="userChat" 
          key={chat[0]} 
          onClick={() => handleSelect(chat[1].userInfo, chat[1].lastMessage?.text)}
        >
          <img className="search-image" src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{decrypt(chat[1].lastMessage?.text)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
