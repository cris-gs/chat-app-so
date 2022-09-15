import { Navbar } from "./Navbar"
import { Search } from "./Search"
import "./styles.css"

export const Sidebar = () => {
  return (
    <div className="sidebar">
        <Navbar/>
        <Search/>
    </div>
  )
}
