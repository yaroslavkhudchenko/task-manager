import React,{useState, useContext} from 'react';
import '../css/Header.scss';
import axios from 'axios';
import App, { AppContext } from './../Components/App';

const Header = () => {

    const [nameNeeded, nameNeededSet] = useState(false)

    const appContext = useContext(AppContext);
    
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
            ).then(()=>
                console.log('success add project'))
            .catch((err)=>
                console.log('errror____' + err)
            )
            nameNeededSet(false);
            console.log('iiiiiiiiiiiiiiiiiiiiiiiiiii')
            appContext.changeState({ ...appContext.state, refreshProjects: true})
        }        
    }
    return (
       
                <div className="Header">
                    <div className='addBoard' onClick={() => nameNeededSet(true)}>Add</div>
                    <div className='projectHeaderName'>
                        {appContext.state.activeProjectName}
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
           
    )
}

export default Header;
