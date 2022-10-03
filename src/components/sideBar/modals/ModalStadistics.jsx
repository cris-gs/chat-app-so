import { useContext} from "react";
//import { ChatContext } from "../../../context/ChatContext";
import { ModalsContext } from "../../../context/ModalsContext";
const icons = require.context('../../../assets', true);

export const ModalStadistics = ({message}) => {

  //const { data } = useContext(ChatContext);
  const { stateModalStadistics, setStateModalStadistics } = useContext(ModalsContext);
  

  return (
    <div className="containerModal">
      <div className="ModalSearch">
        <div className="ModalStadistics-title">
          <img className='img-darkBack' src={icons('./whiteBack.svg')} alt="" onClick={ () => setStateModalStadistics(!stateModalStadistics)}/>
          <div>Stadistics</div>
        </div>
      </div>
    </div>
  )
}

