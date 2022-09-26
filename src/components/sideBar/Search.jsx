import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

export const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async() => {
    setUser(null);
    if (username !== "") {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      )
      console.log(q)
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
  
        if (querySnapshot.empty) {
          setError(true);
        } else {
          setError(false);
        }
      } catch (error) {
        setError(true);
      }
    } else {
      setError(false);
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async() => {
    //Check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages:{} });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Find a user" 
          onKeyDown={ handleKey } 
          onChange={ e=>setUsername(e.target.value) }
        />
      </div>
      {user && <div className="userChat" onClick={ handleSelect }>
        <img 
          className="search-image" 
          src={ user.photoURL }
          alt="" 
        />
        <div className="userChatInfo">
          <span>{ user.displayName }</span>
        </div>
      </div>}
      {error && <span className="not-found">User not found! 😧</span>}
    </div>
  )
}
