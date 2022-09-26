import { useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { ModalsContext } from "../../../context/ModalsContext";

export const ModalBlock = () => {

  const { data } = useContext(ChatContext);
  const { stateModalBlock, setStateModalBlock } = useContext(ModalsContext);

  const handleBlock = () => {
    setStateModalBlock(!stateModalBlock);
    console.log("User was blocked!");
    /* Codigo para bloquear usuario */
  }

  return (
    <>
      {stateModalBlock && 
        <div className="containerModal">
          <div className="ModalBlock">
            <p>¿Desea bloquear a { data.user?.displayName }?</p>
            <div className="ModalBlock-buttons">
              <button className="button-block" onClick={ handleBlock }>Block</button>
              <button className="button-cancel" onClick={ () => setStateModalBlock(!stateModalBlock) }>Cancel</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}
