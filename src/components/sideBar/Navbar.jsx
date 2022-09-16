const icons = require.context('../../assets', true);

export const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">SO Chat</span>
      <div className="user">
        <img className="navbar-image" src="https://yt3.ggpht.com/yti/AJo0G0laMUi3ob58OtLwqWkRRTfQKsg_3Z_scaLIlc1_9w=s88-c-k-c0x00ffffff-no-rj-mo" alt="" />
        <span>Cristopher</span>
        <button className="navbar-button"><img src={icons('./logout.svg')} alt="" /></button>
      </div>
    </div>
  )
}
