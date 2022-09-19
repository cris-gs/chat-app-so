import { useState } from "react";

export const useSidebarChat = () => {

    const [window, setWindow] = useState(true)

    const sidebar = () => {
        /* if (value === "sidebar"){
            document.getElementById('sidebar').style.display = 'none';
            document.getElementById('chat').style.width = 'block';
            console.log("sidebar"); 
        } */
        setWindow(false);
        console.log('entró')
    }

    const chat = () => {
        /* if (value === "chat"){
            document.getElementById('sidebar').style.display = 'block';
            document.getElementById('chat').style.display = 'node';
            console.log("chat")   
        } */
        setWindow(true);   
    }


    return {
        window,
        sidebar,
        chat,
    }


}
