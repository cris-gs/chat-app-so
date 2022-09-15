import { Chat } from "../components/chat/Chat"
import { Sidebar } from "../components/sideBar/Sidebar"
import "./styles.css"
const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home