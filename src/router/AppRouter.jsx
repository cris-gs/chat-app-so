import { Navigate, Route, Routes } from 'react-router-dom'
import { Chat } from "../components/chat/Chat"
import { Contacts } from "../components/contacts/Contacts"
import { MainChats } from "../components/mainChat/MainChats"
import { Profile } from "../components/profile/Profile"

export const AppRouter = () => {
  return (
    <>
        <Routes>
          
            <Route path="mainChat" element={<MainChats/>} />
            <Route path="chat" element={<Chat />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="profile" element={<Profile />} />
            
            <Route path="/" element={<Navigate to={"/mainChat"} />} />
        </Routes>
    </>
  )
}
