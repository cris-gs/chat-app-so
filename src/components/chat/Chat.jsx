import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { WindowContext } from '../../context/WindowContext';
import { ModalsContext } from '../../context/ModalsContext';
import { Input } from './Input';
import { Messages } from './Messages';

import "./styles.css"
import { ModalBlock } from './modals/ModalBlock';
const icons = require.context('../../assets', true);

export const Chat = () => {

  const { data } = useContext(ChatContext);

  const { stayWindow, setStayWindow } = useContext(WindowContext);

  const { stateModalOption, setStateModalOption } = useContext(ModalsContext);

  const handleSelect = () => {
    if(window.innerWidth>581){
      setStayWindow({
          sidebar: true,
          chat: true  
      })
    }else{
      setStayWindow({ sidebar: true, chat:false })
      document.getElementById("sidebar").style.display="block";
    }
  }



  return (
    <div className={`${stayWindow.chat ? 'chat':'close'}`} id='chat'>
      <div className='main-chatInfo'>
        <img className='img-back' src={icons('./back.svg')} alt="" onClick={ handleSelect } />
        <div className="chatInfo">
          <span>{ data.user?.displayName }</span>
          <div className="chatIcons">
            {/* <img src={icons('./addFriend.svg')} alt="" /> */}
            <img src={icons('./more.svg')} alt="" onClick={ () => setStateModalOption(!stateModalOption)} />
          </div>
        </div>
      </div>
      <Messages/>
      <Input/>
      <ModalBlock/>
    </div>
  )
}
