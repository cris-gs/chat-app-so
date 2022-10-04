import { useContext} from "react";
import { ModalsContext } from "../../../context/ModalsContext";
import { ShowStadistics } from "./ShowStadistics";

const icons = require.context('../../../assets', true);

export const ModalStadistics = ({messages, totalGeneral}) => {

  const { stateModalStadistics, setStateModalStadistics } = useContext(ModalsContext);

  let messagesSort = [] 
  Object.entries(messages).forEach((message)=>{
    messagesSort = [...messagesSort, message[1]]
  })

  messagesSort.sort((a, b)=> b.top - a.top)

  return (
    <div className="containerModal">
      <div className="ModalStadistics">
        <div className="ModalStadistics-title">
          <img className='img-darkBack' src={icons('./whiteBack.svg')} alt="" onClick={ () => setStateModalStadistics(!stateModalStadistics)}/>
          <div>Stadistics</div>
        </div>
        <div className="containerStadistics">
          <div className="totalGeneral">
            <div className="totalGeneral-title">General statistics</div>
            <div className="totalGeneral-data">
              <div><img className='img-darkBack' src={icons('./photo.svg')} alt=""/>: {totalGeneral.totalGeneralImage}</div>
              <div><img className='img-darkBack' src={icons('./video.svg')} alt=""/>: {totalGeneral.totalGeneralVideo}</div>
              <div><img className='img-darkBack' src={icons('./whiteMicrophone.svg')} alt=""/>: {totalGeneral.totalGeneralAudio}</div>
              <div><img className='img-darkBack' src={icons('./message.svg')} alt=""/>: {totalGeneral.totalGeneralMessage}</div>
            </div>
          </div>
          <div className="titleTop">User interaction top</div>
          {
            Object.entries(messagesSort).map((message) =>(
              <ShowStadistics message={message[1]} key={message[0]}/>
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

