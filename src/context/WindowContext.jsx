import { createContext, useState } from "react";

export const WindowContext = createContext();

export const WindowContextProvider = ({ children }) => {

    const [stayWindow, setStayWindow] = useState({
        sidebar: true,
        chat: true
    });

    return(
        <WindowContext.Provider value={{ stayWindow, setStayWindow }}>
            { children }
        </WindowContext.Provider>
    )
}