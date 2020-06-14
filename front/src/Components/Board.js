import React, { useState, useEffect, useContext } from 'react';
import '../css/Board.scss';
import axios from 'axios';
import { GetTasks } from './../Hooks/GetTasks';
import { AppContext } from './../Components/App';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Board = () => {
	const [tasksState, setTasksState] = useState([]);

	const [tasksShouldBeSaved, setTasksToBeSaved] = useState(false)


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
							order: appContext.state.highestCurrentOrder+1
						}
					).then(()=>
						appContext.changeState(
							{ 
								...appContext.state, 
								refreshTasks: true, 
								highestCurrentOrder:appContext.state.highestCurrentOrder+1 
							}
						)
					)
					// nameNeededSet(false);
					

			}

	}
	 	// function to reorder on dragend
		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);

			return result;
		};
		const onDragFinish = (e) => {
			console.log('s');
			if (!e.source || !e.destination) return; // not to have an error when destination is not correct
			const items = reorder(
				tasksState,
				e.source.index,
				e.destination.index
			);
 
			items.map((e,index) => e.order = index);

			setTasksState(items);
			setTasksToBeSaved(true);
		} 

	useEffect(()=>{
		if (tasksShouldBeSaved) {
			axios.post('http://localhost:5000/tasks', tasksState)
				.then((e)=> console.log('success saving all tasks together'))
				.catch((err) => console.log(`error => ${err}`))
			setTasksToBeSaved(false);
		}
	}, [tasksShouldBeSaved])
	
	return (
    <DragDropContext onDragEnd={onDragFinish}>
      <div
        className={
          appContext.state.isHiddenSidebar
            ? "Board boardWithHiddenSidebar"
            : "Board"
        }
      >
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              id="TasksContainer"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <GetTasks tasksState={tasksState} setTasksState={setTasksState} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {appContext.state.activeProjectName ? (
          <div
            id="ghostTask"
            onClick={() => AddTask(appContext.state.activeProjectName)}
          >
            <div id="addTaskButton">
              <AddCircleOutlineIcon
                style={{ fontSize: 120, color: "#77865B", opacity: "1" }}
              />
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </DragDropContext>
  );
}

export default Board;
