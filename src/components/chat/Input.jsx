import { useContext, useState } from "react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";
import { RecordRTCPromisesHandler } from "recordrtc";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const icons = require.context('../../assets', true);

export const Input = () => {

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState();
  const [stream, setStream] = useState();

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  const handleSend = async() => {
      if (text !== "") {
        const encryptedMessage = CryptoJS.AES.encrypt(text, '@pTSCA42vm94yl4EE4Tjb').toString();
        const id = uuid();

        if(file){

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

        setText("");
        setFile(null);
      }
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

  return (
    <div className="input">
      <input 
        type="text" 
        placeholder="Write Some..." 
        onChange={event => setText(event.target.value)} 
        value={text}
      />
      <div className="send">
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
