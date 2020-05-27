import React, { useState, useEffect } from 'react';
import { fakeData } from './../fakeData/fakeData';

export const GetProjects = () => {
    console.log('in hook I am')
    const [projectsState, setProjectsState] = useState([]);
    console.log(projectsState)

    useEffect(()=>{
        setProjectsState(fakeData);
    },[])
    // addProject();

    return(fakeData.map(single=><div className='projectTitle'>{single.name}</div>))
};

