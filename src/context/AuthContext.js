import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext() 

// pasar componentes
export const AuthContextProvider = ({children}) => { 
    const [currentUser, setCurrentUser] = useState({}) 

    // checkear cuando hay un usuario o no
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);

        });
    
        return () => {
          unsub();
        };
      }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
          {children}
        </AuthContext.Provider>
      );
}