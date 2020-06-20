import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from './../Components/App';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
export const GetProjects = ({ 
  setChangingProjectTitle,
  setActiveProject,
  activeProject
}) => {
   
    const [projectsState, setProjectsState] = useState([]); // state for projects

    const appContext = useContext(AppContext); // global context

    const [deleteSingleProjectShow, setDeleteProjectShow] = useState(false);

    // to delete single project based on it's id
    const deleteSingleProject = (id, name) => {
        axios
          .delete(`http://localhost:5000/projects/${id}`, {
            data: { projectName: name },
          })
          .then(
            () =>
              appContext.changeState({
                ...appContext.state,
                refreshProjects: true,
                refreshTasks: true,
              }) // refresg projects and tasks lists
          )
          .catch((err) => console.log("error while deleting project ", err));
        
    }

    useEffect(()=>{
        
        axios.get('http://localhost:5000/projects')
            .then(res=> {
                setProjectsState(res.data);
                if (appContext.state.activeProjectName === null && res.data.length) { // to run only at the very beginning when name is not set and check if there are any project to grab name from
                    appContext.changeState({ ...appContext.state, activeProjectName: res.data[0].name })
                };
                if(!res.data.length) {
                    appContext.changeState({ ...appContext.state, activeProjectName: null })
                }
            })
            .catch(err => console.log('error on getting projects ' + err));

        appContext.changeState({ ...appContext.state, refreshProjects:false});

    }, [appContext.state.refreshProjects]); // if refresProject value from appContext is changed refresh the list

    return projectsState.map((single, index) => (
      <div
        key={index}
        className={
          appContext.state.activeProjectNb == index
            ? "singleProject singleProjectActive"
            : "singleProject"
        } // check current project is active
      >
        <div
          className="projectTitle"
          onClick={() =>
            appContext.changeState(
              // onClick change active project
              {
                ...appContext.state,
                activeProjectNb: index,
                activeProjectName: single.name,
              }
            )
          }
        >
          {single.name}
        </div>
        <div className="projectTitleButtons">
          <div
            className="changeSingleProjectButton"
            onClick={() => {
              setActiveProject(single);
              setChangingProjectTitle(true);
            }}
          >
            <CreateIcon style={{ color: "#F4F3F4" }} />
          </div>
          <div
            className="deleteSingleProjectButton"
            /* onClick={() => deleteSingleProject(single._id, single.name)} */
            onClick={() => {
              setActiveProject(single);
              setDeleteProjectShow(true);
            }}
          >
            <DeleteForeverIcon style={{ color: "#F4F3F4" }} />
            {(deleteSingleProjectShow && single._id === activeProject._id) && (
              <div className="deleteSingleProjectModal">
                <div
                  className="deleteSingleProjectModalYes"
                  onClick={() => deleteSingleProject(single._id, single.name)}
                >
                  YES
                </div>
                <div
                  className="deleteSingleProjectModalCancel"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteProjectShow(false);
                  }}
                >
                  Cancel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
};

