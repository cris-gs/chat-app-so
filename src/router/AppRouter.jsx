import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from '../pages/Login'
import Register from '../pages/Register'

export const AppRouter = () => {

  const {currentUser} = useContext(AuthContext) 

  const ProtectedRoute = ({children}) => {
    if (!currentUser){ 
      return <Navigate to = "/login" />
    }

    return children
  }

  return (
    <>
        <Routes>
            <Route path="/">
            {/* protect home page */}
              <Route index element={
                  <ProtectedRoute>
                    {/* <Home /> */}
                  </ProtectedRoute>
                }
              />

              <Route path="login" element = {<Login/>}/>
              <Route path="register" element = {<Register/>}/>
            </Route>
        </Routes>
    </>
  )
}
