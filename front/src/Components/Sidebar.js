import React,{useEffect, useState} from 'react';
import '../css/Sidebar.scss';
import { GetProjects } from './../Hooks/GetProjects';
import { AppContext } from './../Components/App';

const Sidebar = () => {
    const [SidebarState, setSidebarState] = useState(false);

    //useEffect(() => console.log('adfawefawf'))
    const handleClick = () => setSidebarState(!SidebarState);

    return (
        <AppContext.Consumer>
            {value =>
                <div className={value.state.isHiddenSidebar ? 'Sidebar hiddenSidebar' : 'Sidebar'}>
                    <div id='sidebarCloser' onClick={() =>value.changeState({...value.state,isHiddenSidebar:!value.state.isHiddenSidebar})}>closeit</div>
                    <div className='title'>
                        Projects: 
                    </div>
                    <div className='content'>
                        <GetProjects />
                    </div>
                </div>
            }
        </AppContext.Consumer>
    );
}

export default Sidebar;
