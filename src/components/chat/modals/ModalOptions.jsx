import { useContext } from "react";
import { ModalsContext } from "../../../context/ModalsContext";

export const ModalOptions = () => {
    const { stateModalOption, setStateModalOption } = useContext(ModalsContext);
    const { stateModalBlock, setStateModalBlock } = useContext(ModalsContext);

    const handleFilter = () =>{
        setStateModalOption(!stateModalOption);
    }

    const handleSearch = () =>{
        setStateModalOption(!stateModalOption);
    }

    const handleBlock = () =>{
        setStateModalOption(!stateModalOption);
        setStateModalBlock(!stateModalBlock)
    }

  return (
    <>
        {stateModalOption &&
        <div className="containerModalOptions">
            <div className="modalOptions">
                <p onClick={handleFilter}>Filter files</p>
                <p onClick={handleSearch}>Search messages</p>
                <p className="block" onClick={handleBlock}>Block</p>
            </div>
        </div>
        }
    </>
  )
}
