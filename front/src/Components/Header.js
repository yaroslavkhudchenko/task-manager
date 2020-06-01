import React,{useState} from 'react';
import '../css/Header.scss';
import { fakeData } from './../fakeData/fakeData';
import axios from 'axios';

const Header = () => {

    const [nameNeeded, nameNeededSet] = useState(false)

    // add new project to the database
    const AddProject = () => {

        let name = document.querySelector('.addNameModule input').value;
        axios.post('http://localhost:5000/projects/addproject',
            {
                name: name,
                nbTask: 0,
                tasks: [],
                archived: false
            }
        )
        nameNeededSet(false);

    }
    return (
        <div className="Header">
            <div className='addBoard' onClick={() => nameNeededSet(true)}>Add</div>
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
