const icons = require.context('../../assets', true);

export const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Write Something.." />
      <div className="send">
      <img src={icons('./microphone.svg')} alt="" />
        <img src={icons('./clip.svg')} alt="" />
        <input type="file" style={{display:"none"}} id="file" />
        <label htmlFor="file">
          <img src={icons('./photo.svg')} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}
