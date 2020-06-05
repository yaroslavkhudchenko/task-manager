import React from 'react';
import '../css/Board.scss';
import axios from 'axios';
import { GetTasks } from './../Hooks/GetTasks';
import { AppContext } from './../Components/App';
const Board = () => {


    const AddTask = () => {

        let name = 'heh';//document.querySelector('.addNameModule input').value;

        // if name is not empty
        if (name) {
            axios.post('http://localhost:5000/tasks/addtask',
                {
                    name: name,
                    subtasks: [],
                    projectName: undefined,
                    archived: false
                }
            )
            // nameNeededSet(false);
        }
    }


    return (
        <AppContext.Consumer>
            {value =>
                <div className={value.state.isHiddenSidebar ? 'Board boardWithHiddenSidebar' : 'Board'}>
                    <div id='addTaskButton' onClick={() => AddTask(value.state.activeProjectName)}>awgagawgwagwawwww</div>
                    <GetTasks />
                </div>
            }
        </AppContext.Consumer>
    );
}

export default Board;
