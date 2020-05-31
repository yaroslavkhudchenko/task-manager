import React, { useState, useEffect } from 'react';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';

export const GetProjects = () => {
    console.log('in hook I am')
    const [projectsState, setProjectsState] = useState([]);
    console.log(projectsState)

    useEffect(()=>{
        axios.get('http://localhost:5000/projects')
            .then(res=>{
                console.log(res.data);
                setProjectsState(res.data);

            });
            
    },[])
    // addProject();

    return (projectsState.map(single=><div className='projectTitle'>{single.name}</div>))
};

