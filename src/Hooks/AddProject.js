import { useState } from 'react';
import {fakeData} from './../fakeData/fakeData';

export const AddProject = () => {
    console.log('in hook I am')
    const [projects, addProject] = useState([]);
    console.log(projects)

   // addProject();


}; 

