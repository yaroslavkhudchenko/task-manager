import React, { useState } from 'react';
import axios from 'axios';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CancelIcon from '@material-ui/icons/Cancel';

const SingleSubTask = ({ title, descr, setOpenDescr, task, subTaskIndex}) => {

  const [deleteSingleSubTaskShow, setDeleteSingleSubTaskShow] = useState(false);

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
      // console.log(e.target)
      let good = task
      console.log(good.subtasks)
      good.subtasks.splice(subTaskIndex,1)
      console.log(good.subtasks)


      axios.post(`http://localhost:5000/tasks/edit/${good._id}`, {
        subtasksNewArray: good.subtasks,
      })
        .then((res) => {
          console.log('edit/delete singlesubtask success');
          setOpenDescr(false)
        })
        .catch((error) => console.error("error while deleting/editing (singlesubtask)" + error)); 

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
            <CancelIcon />
          </div>
          <div id="deleteSingleSubTask" onClick={() => setDeleteSingleSubTaskShow(true)}>
            Delete <DeleteForeverIcon />
            {deleteSingleSubTaskShow && (
              <div className="deleteSingleTaskModal deleteSingleSubTaskModal">
                <div
                  className="deleteSingleTaskModalYes"
                  onClick={() => deleteSingleSubTask()}
                >
                  <DeleteForeverIcon
                    style={{
                      color: "red",
                      fontSize: "30",
                    }}
                  />
                </div>
                <div
                  className="deleteSingleTaskModalCancel"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteSingleSubTaskShow(false);
                  }}
                >
                  <CancelIcon
                    style={{
                      color: "green",
                      fontSize: "30",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
export default SingleSubTask;
