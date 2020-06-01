import React, { useState, useEffect } from 'react';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';

export const GetProjects = () => {
    console.log('in hook I am')
    const [projectsState, setProjectsState] = useState([]);


    let newData = null;
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
                newData = res.data;
            });
            
    }, [])
    // addProject();

    return (projectsState.map(single=> 
        <div className='singleProject'>
            <div className='projectTitle'>{single.name}</div>
            <div className='deleteSingleProject' onClick={() => deleteSingleProject(single._id)}>delete</div>
        </div>
    ))
};

