import React from 'react';
import '../css/Header.scss';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';

const Header = () => {
    const AddProject = () => {
        /* console.log('add project hehe')
        fakeData.push({
            name: 'project4',
            id: 4,
            nbTask: 0,
            tasks: [],
            archived: false
        })
        console.log(fakeData) */

        axios.post('http://localhost:5000/addproject',
            {
                name: 'project4',
                nbTask: 0,
                tasks: [],
                archived: false
            }
        )

    }
    return(
        <div className="Header">
            <div className='addBoard' onClick={AddProject}>Add</div>
        </div>
    )
}

export default Header;
