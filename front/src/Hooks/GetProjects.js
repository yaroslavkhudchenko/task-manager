import React, { useState, useEffect, useContext } from 'react';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetProjects = () => {
   
    const [projectsState, setProjectsState] = useState([]);

    // const [updatePage, setUpdatePage] = useState(true);

    const appContext = useContext(AppContext);

    // to delete single project
    const deleteSingleProject = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/projects/${id}`).then(()=>
            appContext.changeState({ ...appContext.state, refreshProjects: true })
        )
        

    }

    useEffect(()=>{
        console.log('awf uwdfawpdate page rerender use effeCt in GETPROJECTSSSSSSsss')
        console.log(appContext.state.refreshProjects)
        axios.get('http://localhost:5000/projects')
            .then(res=>{
                console.log('successsssssssssssssssssssssss!')
                console.log(res.data);
                setProjectsState(res.data);
                
            });
        appContext.changeState({ ...appContext.state, refreshProjects:false});
        
    }, [appContext.state.refreshProjects]);
    // addProject();

    return (projectsState.map((single, index)=> 
        
        <div className={appContext.state.activeProjectNb == index ? 'singleProject singleProjectActive' : 'singleProject'} 
            onClick={() => appContext.changeState(
                {
                    ...appContext.state,
                    activeProjectNb: index,
                    activeProjectName: single.name
                }
            )}>
            <div className='projectTitle'>{single.name}</div>
            <div className='deleteSingleProject' onClick={() => deleteSingleProject(single._id)}></div>
        </div>
          
    ))
};

