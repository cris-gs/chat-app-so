import { Navigate, Route, Routes } from 'react-router-dom'
import { Chat } from "../components/chat/Chat"
import { Profile } from "../components/profile/Profile"
import Home from '../pages/Home'

export const AppRouter = () => {
  return (
    <>
        <Routes>
          
            <Route path="mainChat" element={<Home/>} />
            <Route path="chat" element={<Chat />} />
            <Route path="profile" element={<Profile />} />
            
            <Route path="/" element={<Navigate to={"/mainChat"} />} />
        </Routes>
    </>
  )
}
