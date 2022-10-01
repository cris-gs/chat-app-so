import { useContext } from "react";
import { ModalsContext } from "../../../context/ModalsContext";
const icons = require.context('../../../assets', true);
export const ModalSearch = () => {

  const { stateModalSearch, setStateModalSearch } = useContext(ModalsContext);

  return (
    <>
      { stateModalSearch &&
        <div className="containerModal">
          <div className="ModalSearch">
            <div className="ModalSearch-input">
              <img className='img-darkBack' src={icons('./darkBack.svg')} alt="" onClick={ () => setStateModalSearch(!stateModalSearch)}/>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for a message" 
                /* onKeyDown={ handleKey } 
                onChange={ e=>setUsername(e.target.value) } */
              />
            </div>
          </div>
        </div>
      }
    </>
    
  )
}
