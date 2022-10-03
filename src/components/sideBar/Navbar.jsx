//import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
//import { ModalsContext } from "../../context/ModalsContext";
import { auth, db } from "../../firebase";
//import { ModalStadistics } from "./modals/ModalStadistics";

const icons = require.context('../../assets', true);

export const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  //const { stateModalStadistics, setStateModalStadistics } = useContext(ModalsContext);
  const [userChats, setuserChats] = useState([])
  //const [chats, setChats] = useState([])
  //const [messages, setMessages] = useState([])
  //const [countMessages, setCountMessages] = useState([])

  const search = async() => {
    //setMessages(null);

    await onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setuserChats(doc.data());
    });
    let users = []
    Object.entries(userChats)?.map( userChat => (
      users = [...users, userChat]
    ))
    //console.log(users)

    //let listChats=[]
    //setMessages([])
    
    //let cont = 0
    
    const chatsC = collection(db, 'chats');
    const chatsSP = await getDocs(chatsC);
  
    chatsSP.docs.map((element) => (
      //{ ...element.data(), id: element.id}
      //console.log(element)
      console.log(Object.entries(element.data())[0])
      ))

    //console.log(chats)

    /* Object.entries(chats).map((chat)=>(
      console.log(chat)
    )) */

    /* users.forEach((user) => {
      onSnapshot(doc(db, "chats", user[0]), (doc) => {
        Object.entries(doc.data()).forEach((message)=>{
          //console.log(user[1].userInfo.displayName)
          let totalAudio = 0
          let totalImage = 0
          let totalVideo = 0
          let totalMessage = 0
          Object.entries(message[1]).forEach((oneMessage)=>{
            //console.log(oneMessage)
            //console.log(oneMessage[1].type)
            if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === 'audio'){
              //console.log("audio")
              totalAudio++
            }else if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === 'image'){
              //console.log("imagen")
              totalImage++
            }else if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === 'video'){
              //console.log("video")
              totalVideo++
            }else if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === undefined ){
              //console.log("mensaje")
              totalMessage++
            }
          })
          listChats =  [...listChats, {
                        usuario: user[1].userInfo.displayName,
                        photo: user[1].userInfo.photoURL,
                        totalAudio: totalAudio,
                        totalImage: totalImage,
                        totalVideo: totalVideo,
                        totalMessage: totalMessage
                      }]
          cont++
          if(cont === users.length){
            console.log(`Cont: ${cont}`)
            console.log(listChats)
            setMessages(...messages, listChats)
            console.log(messages)
          }
        })
      });
    })

    console.log(messages) */

  }

  return (
    <div className="navbar">
      <span className="logo">PepeChat</span>
      <div className="user">
        <img className="navbar-image" src={currentUser.photoURL} alt="" onClick={ search } />
        <span className="navbar-displayName" onClick={ search }>{currentUser.displayName}</span>
        <button className="navbar-button" onClick={() => signOut(auth)}><img src={icons('./logout.svg')} alt="" /></button>
      </div>
      {/* {stateModalStadistics && 
        Object.entries(messages)?.map( message => (
          <ModalStadistics message={message[1]} key={message[0]}/>
        ))} */}
    </div>
  )
}
