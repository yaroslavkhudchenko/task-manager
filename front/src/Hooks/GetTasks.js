import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { AppContext } from './../Components/App';

export const GetTasks = () => {
    console.log('in hook I am tasks')

    const [tasksState, setTaskState] = useState([]);
    const [openDescr, setOpenDescr] = useState(false);
    const [goodSubTask, setGoodSubTask] = useState({
        name:undefined,
        descr:undefined
    })
    // to delete single tasks
    const deleteSingleTask = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/tasks/${id}`);
    }

    const handleOpenModalClick = (good) => {
        setOpenDescr(true);
        setGoodSubTask({
            name:good.name,
            descr:good.descr
        })
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
                                    <div className='subTaskTitle' onClick={()=>handleOpenModalClick(one)}>
                                        {one.name}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='deleteSingleTask' onClick={() => deleteSingleTask(single._id)}></div>
                        {openDescr ?
                            <div id='singleSubTaskModal'>
                                <div id='singleSubTaskModalTitle'>
                                    {goodSubTask.name}
                                </div>
                                <div id='singleSubTaskModalBody'>
                                    {goodSubTask.descr}
                                </div>
                            </div>
                            : false
                        }
                    </div>
                :false
            }
        </AppContext.Consumer>
               
    ))
};
