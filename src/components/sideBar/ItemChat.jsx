import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
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

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user});

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
