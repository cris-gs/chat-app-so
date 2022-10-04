//import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModalsContext } from "../../context/ModalsContext";
import { auth, db } from "../../firebase";
import { ModalStadistics } from "./modals/ModalStadistics";

const icons = require.context('../../assets', true);

export const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  const { stateModalStadistics, setStateModalStadistics } = useContext(ModalsContext);
  const [userChats, setuserChats] = useState([])
  const [messages, setMessages] = useState([])
  const [totalGeneral, seTotalGeneral] = useState([])


  const search = async() => {
    const cleanList = []
    setuserChats(cleanList)
    setMessages(cleanList)
    seTotalGeneral(cleanList)

    
    onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setuserChats(doc.data());
    });
    

    let users = []
    Object.entries(userChats)?.map( userChat => (
      users = [...users, userChat]
    ))

    const chatsC = collection(db, 'chats');
    const chatsSP = await getDocs(chatsC);
    
    let tempChats = []
    users.forEach((user)=>{
      tempChats = [...tempChats, [user[0], user[1]]]
    })

    chatsSP.docs.forEach((element) => {
      for (var i = 0; i < tempChats.length; i++) {
        if(tempChats[i][0] === element.id){
          tempChats[i] = [...tempChats[i], element.data()]
        }
      }

    })

    let listChats=[]
    setMessages(listChats)
    seTotalGeneral(listChats)

    let totalGeneralAudio = 0
    let totalGeneralImage = 0
    let totalGeneralVideo = 0
    let totalGeneralMessage = 0
    tempChats.forEach((chats) => {
      //console.log(chats)
      let totalAudio = 0
      let totalImage = 0
      let totalVideo = 0
      let totalMessage = 0
      let top = 0
      Object.entries(chats[2]).forEach((message)=>{
        //console.log(message)
        Object.entries(message[1]).forEach((oneMessage)=> {
          //console.log(oneMessage)
          if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === 'audio'){
            //console.log("audio")
            totalAudio++
            top++
          }else if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === 'image'){
            //console.log("imagen")
            totalImage++
            top++
          }else if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === 'video'){
            //console.log("video")
            totalVideo++
            top++
          }else if(oneMessage[1].senderId === currentUser.uid && oneMessage[1].type === undefined ){
            //console.log("mensaje")
            totalMessage++
            top++
          }
        })
      
      })
      totalGeneralAudio = totalGeneralAudio+totalAudio
      totalGeneralImage = totalGeneralImage+totalImage
      totalGeneralVideo = totalGeneralVideo+totalVideo
      totalGeneralMessage = totalGeneralMessage+totalMessage
      listChats =  [...listChats, {
        user: chats[1].userInfo.displayName,
        photo: chats[1].userInfo.photoURL,
        top: top
      }] 
    });
    //console.log(listChats)
    setMessages(listChats)
    seTotalGeneral({
      totalGeneralAudio: totalGeneralAudio,
      totalGeneralImage: totalGeneralImage,
      totalGeneralVideo: totalGeneralVideo,
      totalGeneralMessage: totalGeneralMessage
    })

    if(messages.length !== 0){
      setStateModalStadistics(!stateModalStadistics)
    }
  }

  return (
    <div className="navbar">
      <span className="logo">PepeChat</span>
      <div className="user">
        <img className="navbar-image" src={currentUser.photoURL} alt="" onClick={ search } />
        <span className="navbar-displayName" onClick={ search }>{currentUser.displayName}</span>
        <button className="navbar-button" onClick={() => signOut(auth)}><img src={icons('./logout.svg')} alt="" /></button>
      </div>
      {stateModalStadistics && <ModalStadistics messages={messages} totalGeneral={totalGeneral} />}
    </div>
  )
}
