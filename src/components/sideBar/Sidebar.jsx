import { ItemChat } from "./ItemChat"
import { Navbar } from "./Navbar"
import { Search } from "./Search"
import "./styles.css"

export const Sidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
        <Navbar/>
        <Search/>
        <ItemChat/>
    </div>
  )
}
