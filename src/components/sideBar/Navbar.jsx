import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const icons = require.context('../../assets', true);

export const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">SO Chat</span>
      <div className="user">
        <img className="navbar-image" src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button className="navbar-button"><img src={icons('./logout.svg')} alt="" /></button>
      </div>
    </div>
  )
}
