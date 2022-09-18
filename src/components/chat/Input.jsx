import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";

const icons = require.context('../../assets', true);

export const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const currentUser = {
    displayName: "Cristopher",
    email: "cristophergs2001@gmail.com",
    photoURL: "https://yt3.ggpht.com/yti/AJo0G0laMUi3ob58OtLwqWkRRTfQKsg_3Z_scaLIlc1_9w=s88-c-k-c0x00ffffff-no-rj-mo",
    uid: "nsJY2mrccVLGjEC8Y1ER"
  }
  //const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async() => {
    if(img){

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
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
    setImg(null);
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
      <img src={icons('./microphone.svg')} alt="" />
        <img src={icons('./clip.svg')} alt="" />
        <input 
          type="file" 
          style={{display:"none"}} 
          id="file" 
          onChange={event => setImg(event.target.files[0])} 
        />
        <label htmlFor="file">
          <img src={icons('./photo.svg')} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
