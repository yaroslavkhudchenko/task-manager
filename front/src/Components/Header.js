import React from 'react';
import '../css/Header.scss';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';

const Header = () => {
    let nameNeeded = false;
    // add new project to the database
    const AddProject = () => {

        axios.post('http://localhost:5000/projects/addproject',
            {
                name: `project${Math.floor(Math.random() * Math.floor(100))}`,
                nbTask: 0,
                tasks: [],
                archived: false
            }
        )

    }
    return (
        <div className="Header">
            <div className='addBoard' onClick={() => nameNeeded = true}>Add</div>
            {nameNeeded ?
                <div className='addNameModule'>
                    <div className='addNameModuleTitle'>Provide the name</div>
                    <input type='text' required />
                    <div className='saveNamebutton' onClick={AddProject}>Save</div>
                </div>
                : false
            }
        </div>
    )
}

export default Header;
