import { createContext, useContext, useReducer } from "react";
//import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const currentUser = {
    displayName: "Cristopher",
    email: "cristophergs2001@gmail.com",
    photoURL: "https://yt3.ggpht.com/yti/AJo0G0laMUi3ob58OtLwqWkRRTfQKsg_3Z_scaLIlc1_9w=s88-c-k-c0x00ffffff-no-rj-mo",
    uid: "nsJY2mrccVLGjEC8Y1ER"
  }
  //const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};