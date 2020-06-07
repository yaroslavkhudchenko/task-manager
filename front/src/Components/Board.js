import React, { useEffect, useContext } from 'react';
import '../css/Board.scss';
import axios from 'axios';
import { GetTasks } from './../Hooks/GetTasks';
import { AppContext } from './../Components/App';
const Board = () => {

    const appContext = useContext(AppContext);
    const AddTask = (pn) => {
        console.log(pn)
        let name = 'heh';//document.querySelector('.addNameModule input').value;
        console.log('add task running')
        

        // if name is not empty
        if (name) {
            axios.post('http://localhost:5000/tasks/addtask',
                {
                    name: name,
                    subtasks: [],
                    projectName: pn,
                    archived: false
                }
            ).then(()=>
                appContext.changeState({ ...appContext.state, refreshTasks: true })
            )
            // nameNeededSet(false);
            

        }

    }
   

    return (
        
        <div className={appContext.state.isHiddenSidebar ? 'Board boardWithHiddenSidebar' : 'Board'}>
            <div id='addTaskButton' onClick={() => AddTask(appContext.state.activeProjectName)}>Add</div>
            <GetTasks />
        </div>
           
    );
}

export default Board;
