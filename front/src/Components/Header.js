import React,{useState} from 'react';
import '../css/Header.scss';
import axios from 'axios';
import { AppContext } from './../Context/AppContext';

const Header = () => {

    const [nameNeeded, nameNeededSet] = useState(false)

    // add new project to the database
    const AddProject = () => {

        let name = document.querySelector('.addNameModule input').value;

        // if name is not empty
        if(name) {
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
    }
    return (
        <AppContext.Consumer>
            {value =>
                <div className="Header">
                    <div className='addBoard' onClick={() => nameNeededSet(true)}>Add</div>
                    <div className='projectHeaderName'>
                        {value.state.activeProjectName}
                    </div>
                    {nameNeeded ?
                        <div className='addNameModule'>
                            <div className='addNameModuleContent'>
                                <div className='addNameModuleTitle'>Provide the name</div>
                                <input type='text' required />
                                <div className='saveNamebutton' onClick={AddProject}>Save</div>
                            </div>
                        </div>
                        : false
                    }
                </div>
            }
        </AppContext.Consumer>
    )
}

export default Header;
