import React,{useEffect, useState} from 'react';
import '../css/Sidebar.scss';
import { GetProjects } from './../Hooks/GetProjects';

const Sidebar = () => {
    const [SidebarState, setSidebarState] = useState({
        hidden:false
    });

    //useEffect(() => console.log('adfawefawf'))
    
    return (
        <div className={SidebarState.hidden ? 'Sidebar hiddenSidebar' : 'Sidebar'}>
            
            <div className='title'>
                Projects: 
            </div>
            <div className='content'>
                <GetProjects />
            </div>

        </div>
    );
}

export default Sidebar;
