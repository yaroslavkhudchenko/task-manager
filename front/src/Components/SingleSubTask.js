import React from 'react';
import axios from 'axios';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const SingleSubTask = ({ title, descr, setOpenDescr, task, subTaskIndex}) => {
    const handleSubTaskChange = (e, whatHasChanged) => {

            let good = task;
            console.log(good)
              console.log(subTaskIndex);

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

    const deleteSingleSubTask = (e) => {
      console.log(e.target)
    }
    
    return (
      <div id="singleSubTaskModal">
        <div id="singleSubTaskModalContent">
          <div id="singleSubTaskModalTitle">
            <textarea
              defaultValue={title}
              onBlur={(e) =>
                handleSubTaskChange({ title: e.target.value }, "title")
              }
            />
          </div>
          <div id="singleSubTaskModalBody">
            <label>Description</label>
            <textarea
              defaultValue={descr}
              onBlur={(e) =>
                handleSubTaskChange({ descr: e.target.value }, "descr")
              }
            />
          </div>
          <div id="singleSubTaskModalClose" onClick={() => setOpenDescr(false)}>
            close
          </div>
          <div id="deleteSingleSubTask" onClick={()=>deleteSingleSubTask()}>
            Delete <DeleteForeverIcon />
          </div>
        </div>
      </div>
    );
}
export default SingleSubTask;
