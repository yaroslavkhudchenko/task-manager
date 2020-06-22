import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './../Components/App';

import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from '@material-ui/icons/Cancel';
import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SingleSubTask from './../Components/SingleSubTask';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


export const GetTasks = ({ tasksState, setTasksState}) => {




    const [openDescr, setOpenDescr] = useState(false);
    const [goodSubTask, setGoodSubTask] = useState({
        title:undefined,
        descr:undefined
    })

    const [activeTask, setActiveTask] = useState([])

    // get appContext
    const appContext = useContext(AppContext);

    const [deleteSingleTaskShow, setDeleteTaskShow] = useState(false);



    // to delete single tasks
    const deleteSingleTask = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:5000/tasks/${id}`).then(()=>
            appContext.changeState({ ...appContext.state, refreshTasks: true })
        )
    }


    const AddSubTask = (param) => {
        
        axios.post(`http://localhost:5000/tasks/edit/${param}`, {subtasks:'new'})
            .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
            .catch(error => console.error('error while title change ' + error));
    }


    const handleOpenModalClick = (good,index, goodTask) => {
      console.log('ss');
      console.log(goodTask);
        setGoodSubTask({
            title:good.title, 
            descr:good.descr,
            index:index,
            goodTask:goodTask
        })
      setOpenDescr(true);
    };

    const handleTitleChange = (e) => {
        
        axios.post(`http://localhost:5000/tasks/edit/${e.single._id}`,
        {
            name: e.name
        })
        .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
        .catch(error => console.error('error while title change ' + error));

    }
    /* const handleSubTaskTitleChange = (e) => {

        let good = e.single.subtasks;
        good[e.subtaskNb].title = e.title;

        console.log(e);
        axios.post(`http://localhost:5000/tasks/edit/${e.single._id}`,
            {
                subtasksNewArray: good
            })
            .then(res => appContext.changeState({ ...appContext.state, refreshTasks: true }))
            .catch(error => console.error('error while title change ' + error));

    } */
    // function to reorder on dragend
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragFinishTasks = (e,b) => {
        if (!e.source || !e.destination) return; // not to have an error when destination is not correct

        // reorder after drag
        const items = reorder(
            b.subtasks,
            e.source.index,
            e.destination.index
        );
        
        let allTasks = tasksState;

        // set good subtasks to the correct task
        allTasks.map((e) => e._id === b._id ? e.subtasks = items : console.log('fasle'));

        setTasksState(allTasks); // save good order for the front
        // save good subtasks order to the db
        axios.post(`http://localhost:5000/tasks/edit/${b._id}`, { reorder: items })
            .then(res => {
                console.log('drag drop single subtask')
                }
            )
    }
   
    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(res => {
                let goodD = res.data.sort((a, b)=>a.order - b.order);
                setTasksState(goodD)
                
                if(goodD.length) {
                    
                    appContext.changeState(
                        { 
                            ...appContext.state, 
                            highestCurrentOrder: goodD[goodD.length-1].order, 
                            refreshTasks:false
                        }
                    )
                } else {
                    console.log('not true goodD length')
                    appContext.changeState(
                        { 
                            ...appContext.state, 
                            refreshTasks: false 
                        }
                    );
                }
            });
            
    }, [appContext.state.refreshTasks]); // if refreshTasks value from appContext is changed refresh the list
   
    useEffect(
      (e) => {
        console.log("agwaga");
      },
      [deleteSingleTaskShow]
    );
    return tasksState.map((single, index) =>
      appContext.state.activeProjectName === single.projectName ? ( // display tasks only for active project
        <Draggable key={single._id} draggableId={single._id} index={index}>
          {(provided, snapshot) => (
            <div
              className="SingleTaskContainer"
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div key={index} className="singleTask">
                <div
                  className="taskTitle"
                  key={index}
                  {...provided.dragHandleProps}
                >
                  <input
                    defaultValue={single.name}
                    onBlur={(e) =>
                      handleTitleChange({
                        single: single,
                        name: e.target.value,
                      })
                    }
                  />
                  <EditIcon className="editTaskTitlePenIcon" />
                </div>
                <DragDropContext
                  onDragEnd={(e) => onDragFinishTasks(e, single)}
                >
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <div
                        className="taskBody"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {single.subtasks.map((one, index) => (
                          <Draggable
                            key={index + "key"}
                            draggableId={index + "index"}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                key={index + one.title + "22"}
                                className="singleSubTaskContainer"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <div
                                  className="singleSubTask"
                                  onClick={() =>
                                    handleOpenModalClick(one, index, single)
                                  }
                                >
                                  <div className="singleSubTitle">
                                    {one.title}
                                  </div>
                                  <div className="singleSubIcon">
                                    <EditIcon />
                                  </div>
                                  {provided.placeholder}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                        <div className="ghostSubTask">
                          <AddCircleOutlineIcon
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => AddSubTask(single._id)}
                          />
                        </div>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <div
                  className="deleteSingleTask"
                  onClick={(e) => {
                    setActiveTask(single);
                    setDeleteTaskShow(true);
                  }}
                >
                  {deleteSingleTaskShow && single._id === activeTask._id && (
                    <div className="deleteSingleTaskModal">
                      <div
                        className="deleteSingleTaskModalYes"
                        onClick={() => deleteSingleTask(single._id)}
                      >
                        DELETE
                      </div>
                      <div
                        className="deleteSingleTaskModalCancel"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTaskShow(false);
                        }}
                      >
                        NO
                      </div>
                    </div>
                  )}
                  <CancelIcon
                    style={{
                      color: "white",
                      fontSize: "30",
                    }}
                  />
                </div>
                {openDescr && (
                  <SingleSubTask
                    title={goodSubTask.title}
                    descr={goodSubTask.descr}
                    setOpenDescr={setOpenDescr}
                    task={goodSubTask.goodTask}
                    subTaskIndex={goodSubTask.index}
                  />
                )}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      ) : (
        false
      )
    );
};
