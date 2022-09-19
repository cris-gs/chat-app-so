import { Chat } from "../components/chat/Chat"
import { Sidebar } from "../components/sideBar/Sidebar"
import { WindowContextProvider } from "../context/WindowContext"
import "./styles.css"
const Home = () => {

  return (
    <WindowContextProvider>
      <div className='home'>
        <div className="container">
          <Sidebar id="sidebar"/>
          <Chat id="chat"/>
        </div>
      </div>
    </WindowContextProvider>
  )
}

export default Home