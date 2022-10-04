import { useContext, useState, useEffect} from "react";
import { deleteField, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";
import { RecordRTCPromisesHandler } from "recordrtc";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import { BotContext } from "../bots/BotContext";
const icons = require.context('../../assets', true);

export const Input = () => {





  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState();
  const [stream, setStream] = useState();
  const [stateIBlock, setstateIBlock] = useState([])

  const [selfDestruction, setSelfDestruction] = useState(false);
  const [modalPopup, setModalPopup] = useState(false);
  const [time, setTime] = useState('Selected time');
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  const { botResponse, getTime, getWeather, getJoke, setReminder} = useContext(BotContext);

  useEffect(() => {
    if(botResponse){ 
      setText(botResponse);
    }
  }, [botResponse])
  




  async function toggleBot() { 
    let command = text;

    let str = command;
    let splitArr = str.split("$");

    if (splitArr[0].includes("//hora")) {
      const ubi = splitArr[1];
      getTime(ubi);
    }
    if (splitArr[0].includes("//clima")) {
      let lat = splitArr[1];
      getWeather(lat);
    }
    if (splitArr[0].includes("//joke")) {
      getJoke();
    }
    if (splitArr[0].includes("//reminder")) {
      let text = splitArr[1];
      let date = splitArr[2];
      setReminder(text, date);
    }


  }






  const handleSend = async() => {
      await onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setstateIBlock(doc.data());
      });

      let dataBlock = ''
      if (data.user?.block === undefined){
        dataBlock = false
      }else{
        dataBlock = data.user?.block
      }

      let dataIBlock = true
      
      Object.entries(stateIBlock)?.map(IBlock => (
        dataIBlock=(IBlock[1].userInfo.iBlock)
      ))

      if (dataIBlock === undefined){
        dataIBlock = false
      }

      const newOwnerInfo =  {
        uid: data.user?.uid,
        displayName: data.user?.displayName,
        photoURL: data.user?.photoURL,
        block: dataBlock,
        iBlock: ''
      } 
      newOwnerInfo.iBlock=dataIBlock

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".userInfo"]: newOwnerInfo
      });

      dispatch({ type: "CHANGE_IBLOCK", payload: newOwnerInfo });


      // arreglar despues en condicion :  user block -> && data.user?.block === false &&  dataIBlock === false
      if (text !== "" ) {

        // controlar bot
        if (text.charAt(0) === "/" && text.charAt(1) === "/") {
          toggleBot();
          return;
        }
        else { 
          const encryptedMessage = CryptoJS.AES.encrypt(text, '@pTSCA42vm94yl4EE4Tjb').toString();
          const id = uuid();
  
          if(file) {
  
            const type = file.type.includes('video') ? 'video' : file.type.includes('image') ? 'image' : 'audio';
            console.log(file.type);
  
            const storageRef = ref(storage, uuid());
  
            await uploadBytes(storageRef, file);
  
            const downloadURL = await getDownloadURL(storageRef);
            
            await updateDoc(doc(db, "chats", data.chatId), {
              ["messages" + `.${id}`]: {
                id,
                text: encryptedMessage,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL,
                type
              }
            });
          } else {
            await updateDoc(doc(db, "chats", data.chatId), {
              ["messages" + `.${id}`]: {
                id,
                text: encryptedMessage,
                senderId: currentUser.uid,
                date: Timestamp.now()
              }
            });
          }
  
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text: encryptedMessage,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text: encryptedMessage,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
  
          dispatch({ type: "CHANGE_LASTMESSAGE", payload: encryptedMessage});
  
          if(selfDestruction) {
            const number = time === '1 min' ? 60000 : time === '3 min' ? 180000 : 500000;
            setSelfDestruction(false);
            setTime('Selected time');
  
            setTimeout(() => {
              updateDoc(doc(db, "chats", data.chatId), {
                ["messages." + id]: deleteField()
              });
            }, number);
            
          }
  
          setText("");
          setFile(null);
        }
      }
      setText("");
      setFile(null);
  }

  const handleRecording = async() => {
    if(!recording) {
      let stream2 = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const recorder2 = new RecordRTCPromisesHandler(stream2, {
        type: "audio",
      });
      recorder2.startRecording();
      setRecording(true);
      setRecorder(recorder2);
      setStream(stream2)
    } else {
      await recorder.stopRecording();
      let audio = await recorder.getBlob();
      setFile(audio)
      setRecording(false);
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  const handleSelfDestruction = () => {
    if(time !== 'Selected time') {
      setModalPopup(false);
      setSelfDestruction(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div className="input">
      <input 
        type="text" 
        placeholder="Write Some..." 
        onChange={event => setText(event.target.value)} 
        value={text}
      />
      <div className="send">
        <i className={`fa-solid fa-fire ${selfDestruction ? 'self-destruction' : ''}`} onClick={() => setModalPopup(true)}></i>
        <div className={`modal-popup ${modalPopup ? 'modal-popup--open' : ''}`}>
          <div className="header">
            <h2>Message self destruct</h2>
            <label className="fa-solid fa-xmark" onClick={() => setModalPopup(false)}></label>
          </div>
          <div className="body-modal">
            <p>Select how long the message will be deleted</p>
            <div className="dropdown">
              <div className="dropdown-select">
                <span className="select">{time}</span>
                <i className="fa-solid fa-caret-down"></i>
              </div>
              <div className="dropdown-list">
                <div className="dropdown-list__item" onClick={() => setTime('1 min')}>1 min</div>
                <div className="dropdown-list__item" onClick={() => setTime('3 min')}>3 min</div>
                <div className="dropdown-list__item" onClick={() => setTime('5 min')}>5 min</div>
              </div>
            </div>
            <p className={`error ${error ? 'has-error' : ''}`}>Obligatory field</p>
          </div>
          <label className="ok-btn" onClick={handleSelfDestruction}>Save</label>
        </div>
        <button className="recording-button" onClick={handleRecording}><i className={`fa-solid fa-microphone ${recording ? 'recording' : ''}`}></i></button>
        <input 
          type="file" 
          style={{display:"none"}} 
          id="file" 
          onChange={event => setFile(event.target.files[0])} 
        />
        <label htmlFor="file">
          <i className="fa-solid fa-paperclip"></i>
        </label>
        <button onClick={handleSend}><img src={icons('./send.svg')} alt="" /></button>
      </div>
    </div>
  )
}
