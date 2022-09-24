import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { RecordRTCPromisesHandler } from "recordrtc";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";

const icons = require.context('../../assets', true);

export const Input = () => {

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState();
  const [stream, setStream] = useState();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async() => {
    if(file){

      const type = file.type.includes('video') ? 'video' : file.type.includes('image') ? 'image' : 'audio';
      console.log(file.type);

      const storageRef = ref(storage, uuid());

      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          file: downloadURL,
          type
        }),
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

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

  return (
    <div className="input">
      <input 
        type="text" 
        placeholder="Write Some..." 
        onChange={event => setText(event.target.value)} 
        value={text}
      />
      <div className="send">
      <button className="recording-button" onClick={handleRecording}><img src={icons('./microphone.svg')} alt="" /></button>
        <input 
          type="file" 
          style={{display:"none"}} 
          id="file" 
          onChange={event => setFile(event.target.files[0])} 
        />
        <label htmlFor="file">
          <img src={icons('./clip.svg')} alt="" />
        </label>
        <button onClick={handleSend}><img src={icons('./send.svg')} alt="" /></button>
      </div>
    </div>
  )
}
