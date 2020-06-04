import React from 'react';
import '../css/Board.scss';
import axios from 'axios';
import { GetTasks } from './../Hooks/GetTasks';

const Board = () => {


    const AddTask = () => {

        let name = 'heh';//document.querySelector('.addNameModule input').value;

        // if name is not empty
        if (name) {
            axios.post('http://localhost:5000/tasks/addtask',
                {
                    name: name,
                    subtasks: [],
                    projectID: undefined,
                    archived: false
                }
            )
            // nameNeededSet(false);
        }
    }


    return (
        <div className="Board">
            <div id='addTaskButton' onClick={AddTask}>awgagawgwagwawwww</div>
            <GetTasks />
        </div>
    );
}

export default Board;
