import { Chat } from "../components/chat/Chat"
import { Sidebar } from "../components/sideBar/Sidebar"
import { ModalsContextProvider } from "../context/ModalsContext"
import { WindowContextProvider } from "../context/WindowContext"
import "./styles.css"
const Home = () => {

  return (
    <WindowContextProvider>
      <div className='home'>
        <div className="container-home">
          <Sidebar id="sidebar"/>
          <ModalsContextProvider>
            <Chat id="chat"/>
          </ModalsContextProvider>
        </div>
      </div>
    </WindowContextProvider>
  )
}

export default Home