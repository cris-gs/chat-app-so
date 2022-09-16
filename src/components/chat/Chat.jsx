import React from 'react'
import { Input } from './Input';
import { Messages } from './Messages';
import "./styles.css"
const icons = require.context('../../assets', true);

export const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Mario</span>
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
