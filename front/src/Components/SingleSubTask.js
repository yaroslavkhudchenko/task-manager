import React from 'react';
import axios from 'axios';
import appContext from './App';
const SingleSubTask = ({ title, descr, setOpenDescr, task, subTaskIndex}) => {
    
    const handleSubTaskChange = (e, whatHasChanged) => {

            let good = task;
            
            switch(whatHasChanged) {
                case 'title':
                    good.subtasks[subTaskIndex].title = e.title;
                    break;
                case 'descr':
                    good.subtasks[subTaskIndex].descr = e.descr;
                    break;
            }

    axios.post(`http://localhost:5000/tasks/edit/${good._id}`, {
          subtasksNewArray: good.subtasks,
        })
        .then((res) => console.log('edit singlesubtask success'))
        .catch((error) => console.error("error while title change (singlesubtask)" + error)); 
    };


    return (
      <div id="singleSubTaskModal">
        <div id="singleSubTaskModalContent">
          <div id="singleSubTaskModalTitle">
            <textarea
              defaultValue={title}
              onBlur={(e) => handleSubTaskChange({title:e.target.value}, "title")}
            />
          </div>
          <div id="singleSubTaskModalBody">
            <label>Description</label>
            <textarea
              defaultValue={descr}
              onBlur={(e) => handleSubTaskChange({descr:e.target.value}, "descr")}
            />
          </div>
          <div id="singleSubTaskModalClose" onClick={() => setOpenDescr(false)}>
            close
          </div>
        </div>
      </div>
    );
}
export default SingleSubTask;
