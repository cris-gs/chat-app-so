import { useContext } from "react";
import { ModalsContext } from "../../../context/ModalsContext";
const icons = require.context('../../../assets', true);
export const ModalFilter = () => {

  const { stateModalFilter, setStateModalFilter } = useContext(ModalsContext);

  return (
    <>
      { stateModalFilter &&
        <div className="containerModal">
          <div className="ModalSearch">
            <div className="ModalSearch-input">
              <img className='img-darkBack' src={icons('./darkBack.svg')} alt="" onClick={ () => setStateModalFilter(!stateModalFilter)}/>
              <input 
                type="date" 
                className="search-input" 
                placeholder="Search for a message" 
                /* onKeyDown={ handleKey } 
                onChange={ e=>setUsername(e.target.value) } */
              />
              <button>Filter</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}
