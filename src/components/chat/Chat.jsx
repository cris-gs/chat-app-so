import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { Input } from './Input';
import { Messages } from './Messages';
import "./styles.css"
const icons = require.context('../../assets', true);

export const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className='chat' id='chat'>
      <div className="chatInfo">
        <span>{ data.user?.displayName }</span>
        <div className="chatIcons">
          <img src={icons('./addFriend.svg')} alt="" />
          <img src={icons('./more.svg')} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
