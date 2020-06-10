import React, { useEffect, useContext } from 'react';
import '../css/Board.scss';
import axios from 'axios';
import { GetTasks } from './../Hooks/GetTasks';
import { AppContext } from './../Components/App';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
									projectName: pn
							}
					).then(()=>
							appContext.changeState({ ...appContext.state, refreshTasks: true })
					)
					// nameNeededSet(false);
					

			}

	}
	 	// function to reorder on dragend
		/* const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);

			return result;
		};*/
		const onDragFinish = (e) => {
			console.log('s');
			/* const items = reorder(
				this.tasks.items,
				result.source.index,
				result.destination.index
			);  */
 
		} 

	return (
		<DragDropContext onDragEnd={(e) => onDragFinish}>
			<div
				className={
					appContext.state.isHiddenSidebar
						? "Board boardWithHiddenSidebar"
						: "Board"
				}
			>
				<Droppable droppableId="droppable" direction="horizontal">
					{(provided, snapshot) => (
						<div id='TasksContainer' ref={provided.innerRef} {...provided.droppableProps} >
							<GetTasks />
							{provided.placeholder}
						</div>
					)}
					</Droppable>
					{appContext.state.activeProjectName ? 
						<div id="ghostTask" onClick={() => AddTask(appContext.state.activeProjectName)}>
							<div id="addTaskButton">
								<AddCircleOutlineIcon
									style={{ fontSize: 120, color: "#1de9b6", opacity: "1" }}
								/>
							</div>
						</div>
					: false}
			</div>
		</DragDropContext>
	);
}

export default Board;
