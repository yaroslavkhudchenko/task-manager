import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './../Components/App';
import CloseIcon from "@material-ui/icons/Close";

export const GetProjects = () => {
   
    const [projectsState, setProjectsState] = useState([]); // state for projects

    const appContext = useContext(AppContext); // global context

    // to delete single project based on it's id
    const deleteSingleProject = (id, name) => {
        axios.delete(`http://localhost:5000/projects/${id}`, {data:{projectName: name}})
        .then(()=> appContext.changeState({ ...appContext.state, refreshProjects: true, refreshTasks:true }));
    }

    useEffect(()=>{
        
        axios.get('http://localhost:5000/projects')
            .then(res=> {
                setProjectsState(res.data);
                if (appContext.state.activeProjectName === null && res.data.length) { // to run only at the very beginning when name is not set and check if there are any project to grab name from
                    appContext.changeState({ ...appContext.state, activeProjectName: res.data[0].name })
                };
            })
            .catch(err => console.log('error on getting projects ' + err));

        appContext.changeState({ ...appContext.state, refreshProjects:false});

    }, [appContext.state.refreshProjects]); // if refresProject value from appContext is changed refresh the list

    return (projectsState.map((single, index)=> 
        
        <div key={index} className={appContext.state.activeProjectNb == index ? 'singleProject singleProjectActive' : 'singleProject'}  // check current project is active
            onClick={() => appContext.changeState( // onClick change active project
                {
                    ...appContext.state,
                    activeProjectNb: index,
                    activeProjectName: single.name
                }
            )}>
            <div className='projectTitle'>{single.name}</div>
            <div className='deleteSingleProjectButton' onClick={() => deleteSingleProject(single._id, single.name)}>
                <CloseIcon />
            </div>
        </div>
          
    ))
};

