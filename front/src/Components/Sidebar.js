import React,{useEffect, useState} from 'react';
import '../css/Sidebar.scss';
import { GetProjects } from './../Hooks/GetProjects';

const Sidebar = () => {
    // const [projectsState, setProjectsState] = useState({GetProjects});

    useEffect(() => console.log('adfawefawf'))
    return (
        <div className="Sidebar">
            
            <div className='title'>
                Boards: 
            </div>
            <div className='content'>
                <GetProjects />
            </div>

        </div>
    );
}

export default Sidebar;
