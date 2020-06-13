import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './../Components/App';

import AddIcon from '@material-ui/icons/Add';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import CancelIcon from '@material-ui/icons/Cancel';
import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const GetTasks = ({tasksState, setTaskState}) => {

    const [openDescr, setOpenDescr] = useState(false);
    const [goodSubTask, setGoodSubTask] = useState({
        name:undefined,
        descr:undefined
    })
    const appContext = useContext(AppContext);

    // to delete single tasks
    const deleteSingleTask = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/tasks/${id}`).then(()=>
            appContext.changeState({ ...appContext.state, refreshTasks: true })
        )
    }


    const AddSubTask = (param) => {
        console.log('ss')
        console.log(param)
        axios.post(`http://localhost:5000/tasks/edit/${param}`, {subtasks:'new'})
            .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
            .catch(error => console.error('error while title change ' + error));
    }


    const handleOpenModalClick = (good) => {
        setOpenDescr(true);
        setGoodSubTask({
            name:good.title,
            descr:good.descr
        })
    };

    const handleTitleChange = (e) => {
        
        axios.post(`http://localhost:5000/tasks/edit/${e.single._id}`,
        {
            name: e.name
        })
        .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
        .catch(error => console.error('error while title change ' + error));

    }
    const handleSubTaskTitleChange = (e) => {

        let good = e.single.subtasks;
        good[e.subtaskNb].title = e.title;

        console.log(e);
        axios.post(`http://localhost:5000/tasks/edit/${e.single._id}`,
            {
                subtasksNewArray: good
            })
            .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
            .catch(error => console.error('error while title change ' + error));

    }
    // function to reorder on dragend
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragFinishTasks = (e,b) => {
        console.log(e)
        console.log(b._id)
        console.log('finish dragging subtasks')
        
        const items = reorder(
            b.subtasks,
            e.source.index,
            e.destination.index
        );

        items.map((e, index) => e.order = index);


        axios.post(`http://localhost:5000/tasks/edit/${b._id}`, { reorder: items })
            .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
            .catch(error => console.error('error while title change ' + error));

        //setTaskState(items);
        //setTasksToBeSaved(true);
    }

    useEffect(() => {

        axios.get('http://localhost:5000/tasks')
            .then(res => {
                let goodD = res.data.sort((a, b)=>a.order - b.order);
                console.log('-gggggod')
                console.log(goodD)
                setTaskState(goodD)
                if(goodD.length) {
                    console.log('true')
                    appContext.changeState(
                        { 
                            ...appContext.state, 
                            highestCurrentOrder: goodD[goodD.length-1].order, 
                            refreshTasks:false
                        }
                    )
                } else {
                    appContext.changeState({ ...appContext.state, refreshTasks: false });
                }
                // setTaskState(goodD)
                
            });
            
            
        
            
    }, [appContext.state.refreshTasks]); // if refreshTasks value from appContext is changed refresh the list
   
    return (tasksState.map((single, index) =>
            appContext.state.activeProjectName === single.projectName ? // display tasks only for active project
           
            <Draggable
                key={single._id}
                draggableId={single._id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div key={index} className='SingleTaskContainer' ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}>

                        <div key={index} className='singeTask' >
                                <div className='taskTitle'>
                                    <input defaultValue={single.name} onBlur={(e) => handleTitleChange({ single: single, name: e.target.value })} />
                                </div>
                                <DragDropContext onDragEnd={(e)=> onDragFinishTasks(e,single)}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div className='taskBody' ref={provided.innerRef} {...provided.droppableProps}>
                                            {single.subtasks.map((one,index) =>

                                                <Draggable
                                                    key={index+'key'}
                                                    draggableId={index +'index'}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div className='singleSubTaskContainer'>
                                                            <div key={index} className='singleSubTask' ref={provided.innerRef}
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}>
                                                                <input 
                                                                    defaultValue={one.title} 
                                                                    onBlur={(e) => handleSubTaskTitleChange({ single: single, subtaskNb: index, title: e.target.value })} 
                                                                />
                                                                <div className='subTaskOpenModal' onClick={() => handleOpenModalClick(one)}>
                                                                    <OpenInNewIcon />
                                                                </div>
                                                                {provided.placeholder}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>

                                            )}
                                            <div className='ghostSubTask'>
                                                <AddIcon onClick={() => AddSubTask(single._id)} />
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
					                </Droppable>

                                </DragDropContext>
                                <div className='deleteSingleTask' onClick={() => deleteSingleTask(single._id)}>
                                    <CancelIcon 
                                        style={{
                                            color:'white',
                                            fontSize: '30'
                                        }}
                                    />
                                </div>
                                {openDescr ?
                                    <div id='singleSubTaskModal'>
                                        <div id='singleSubTaskModalTitle'>
                                            {goodSubTask.title}
                                        </div>
                                        <div id='singleSubTaskModalBody'>
                                            {goodSubTask.descr}
                                        </div>
                                        <div id='singleSubTaskModalClose' onClick={()=>setOpenDescr(false)}>
                                            close
                                        </div>
                                    </div>
                                    : false
                                }
                            </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        :false
            
    ));
};
