import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { Reminders } from "../reminders/Reminders";
const icons = require.context('../../assets', true);

export const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">PepeChat</span>
      <div className="user">
        <Reminders />
        <img className="navbar-image" src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button className="navbar-button" onClick={() => signOut(auth)}><img src={icons('./logout.svg')} alt="" /></button>
      </div>
    </div>
  )
}
