import { Message } from "./Message"
import { MessageOwner } from "./MessageOwner"

export const Messages = () => {
  return (
    <div className="messages">
        <Message/>
        <MessageOwner/>
        <Message/>
        <MessageOwner/>
        <Message/>
        <MessageOwner/>
        <Message/>
    </div>
  )
}
