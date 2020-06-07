import React,{useEffect, useState, useContext} from 'react';
import '../css/Sidebar.scss';
import { GetProjects } from './../Hooks/GetProjects';
import { AppContext } from './../Components/App';
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Sidebar = () => {
    const [SidebarState, setSidebarState] = useState(false);

    //useEffect(() => console.log('adfawefawf'))
    const handleClick = () => setSidebarState(!SidebarState);
    const appContext = useContext(AppContext);

    return (
        <div 
            className={appContext.state.isHiddenSidebar ? 'Sidebar hiddenSidebar' : 'Sidebar'} // hide or show based on global variable
            onClick={appContext.state.isHiddenSidebar ? () => appContext.changeState({ ...appContext.state, isHiddenSidebar: false }) : undefined}
        >
            <div id='sidebarCloser' onClick={() =>appContext.changeState({...appContext.state,isHiddenSidebar:true})}>close</div> {/* button to close the sidebar */}
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
