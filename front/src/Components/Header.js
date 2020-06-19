import React,{useState, useContext} from 'react';
import '../css/Header.scss';
import { AppContext } from './../Components/App';
const Header = () => {
    const appContext = useContext(AppContext);

    return (
       
        <div className="Header">
            <div className='projectHeaderName'>
                {appContext.state.activeProjectName}
            </div>
            
        </div>
           
    )
}

export default Header;
