import { useContext } from "react"
import { WindowContext } from "../../context/WindowContext"
import { ItemChat } from "./ItemChat"
import { Navbar } from "./Navbar"
import { Search } from "./Search"
import "./styles.css"

export const Sidebar = () => {

  const { stayWindow } = useContext(WindowContext);

  return (
    <div className={`${stayWindow.sidebar ? 'sidebar':'close'}`} id="sidebar">
        <Navbar/>
        <Search/>
        <ItemChat/>
    </div>
  )
}
