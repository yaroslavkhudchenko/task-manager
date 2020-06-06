import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetTasks = () => {
    console.log('in hook I am tasks')

    const [tasksState, setTaskState] = useState([]);
    const [openDescr, setOpenDescr] = useState(false);

    // to delete single tasks
    const deleteSingleTask = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/tasks/${id}`);
    }

    useEffect(() => {

        axios.get('http://localhost:5000/tasks')
            .then(res => {
                console.log(res.data);
                setTaskState(res.data);
            });

            console.log(tasksState)
    }, [])
    // addProject();

    return (tasksState.map((single, index) =>
        <AppContext.Consumer>
            {value => value.state.activeProjectName === single.projectName ?
                    <div className='singeTask'>
                        <div className='taskTitle'>{single.name}</div>
                        <div className='taskBody'>
                            {single.subtasks.map(one =>
                                <div className='singleSubTask'>
                                    <div className='subTaskTitle' onClick={()=>setOpenDescr(true)}>
                                        {one.name}
                                    </div>
                                    <div id='singleSubTaskModal'>
                                        <div id='singleSubTaskModalTitle'>
                                            {one.name}
                                        </div>
                                        <div id='singleSubTaskModalBody'>
                                            {one.descr}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='deleteSingleTask' onClick={() => deleteSingleTask(single._id)}></div>
                    </div>
                :false
            }
        </AppContext.Consumer>
               
    ))
};
