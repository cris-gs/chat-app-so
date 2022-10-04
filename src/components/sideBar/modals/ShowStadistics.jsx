
export const ShowStadistics = ({message}) => {
  return (
    <div className="itemChat">
        <div 
          className="userChat" 
        >
          <img className="search-image" src={message.photo} alt="" />
          <div className="userChatInfo">
            <span>{message.user}</span>
          </div>
        </div>
    </div>
    
  )
}
