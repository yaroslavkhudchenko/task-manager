import React, { useState, useEffect } from 'react';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetProjects = () => {
   
    const [projectsState, setProjectsState] = useState([]);

    // to delete single project
    const deleteSingleProject = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/projects/${id}`);
    }

    useEffect(()=>{
        
        axios.get('http://localhost:5000/projects')
            .then(res=>{
                console.log(res.data);
                setProjectsState(res.data);
            });
            
    }, [])
    // addProject();

    return (projectsState.map((single, index)=> 
        <AppContext.Consumer>
            {value =>
                <div className={value.state.activeProjectNb == index ? 'singleProject singleProjectActive' : 'singleProject'} 
                    onClick={() => value.changeState(
                        {
                            ...value.state,
                            activeProjectNb: index,
                            activeProjectName: single.name
                        }
                    )}>
                    <div className='projectTitle'>{single.name}</div>
                    <div className='deleteSingleProject' onClick={() => deleteSingleProject(single._id)}></div>
                </div>
            }
        </AppContext.Consumer>
    ))
};

