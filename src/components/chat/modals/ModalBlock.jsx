import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { ModalsContext } from "../../../context/ModalsContext";

export const ModalBlock = () => {

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const { stateModalBlock, setStateModalBlock } = useContext(ModalsContext);

  const handleBlock = async() => {
    setStateModalBlock(!stateModalBlock);

    if(!(data.user?.iBlock)){
      let block = (data.user?.block)

      const newOwnerInfo =  {
        uid: data.user?.uid,
        displayName: data.user?.displayName,
        photoURL: data.user?.photoURL,
        block: !block
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".userInfo"]: newOwnerInfo
      });

      dispatch({ type: "CHANGE_BLOCK", payload: newOwnerInfo });

      const newUserInfo =  {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        iBlock: !block
      }

      await updateDoc(doc(db, "userChats", data.user?.uid), {
        [data.chatId + ".userInfo"]: newUserInfo
      });
    }
  }


  return (
    <>
      {stateModalBlock && 
        <div className="containerModal">
          <div className="ModalBlock">
            <p>Do you want {data.user?.block ? 'to unblock': 'block'} { data.user?.displayName }?</p>
            <div className="ModalBlock-buttons">
              <button className="button-block" onClick={ handleBlock }>{data.user?.block ? 'Unblock': 'Block'}</button>
              <button className="button-cancel" onClick={ () => setStateModalBlock(!stateModalBlock) }>Cancel</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}
