import { Chat } from "../components/chat/Chat"
import { Sidebar } from "../components/sideBar/Sidebar"
import "./styles.css"
const Home = () => {
  
  return (
    <div className='home'>
      <div className="container">
        <Sidebar id="sidebar"/>
        <Chat id="chat"/>
      </div>
    </div>
  )
}

export default Home