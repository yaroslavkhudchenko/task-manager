import React, { useEffect, useContext } from 'react';
import '../css/Board.scss';
import axios from 'axios';
import { GetTasks } from './../Hooks/GetTasks';
import { AppContext } from './../Components/App';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
   

    return (
      <div
        className={
          appContext.state.isHiddenSidebar
            ? "Board boardWithHiddenSidebar"
            : "Board"
        }
      >
      {appContext.state.activeProjectName ?
        <div>
          <GetTasks />
          <div id="ghostTask" onClick={() => AddTask(appContext.state.activeProjectName)}>
            <div id="addTaskButton">
              <AddCircleOutlineIcon
                style={{ fontSize: 120, color: "#1de9b6", opacity: "1" }}
              />
            </div>
          </div>
          </div>
      : false }
      </div>

    );
}

export default Board;
