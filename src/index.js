import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ChatApp } from "./ChatApp"
import { ChatContextProvider } from './context/ChatContext';
import { AuthContextProvider } from './context/AuthContext';
import { BotContextProvider } from './components/bots/BotContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
    <BotContextProvider>
        <React.StrictMode>
          <BrowserRouter>
            <ChatApp/>
          </BrowserRouter>
        </React.StrictMode>
    </BotContextProvider>
    </ChatContextProvider> 
  </AuthContextProvider>
)
