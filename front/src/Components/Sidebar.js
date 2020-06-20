import React,{useEffect, useState, useContext} from 'react';
import '../css/Sidebar.scss';
import { GetProjects } from './../Hooks/GetProjects';
import { AppContext } from './../Components/App';
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Sidebar = () => {


  const [nameNeeded, nameNeededSet] = useState(false);
  const [changingProjectTitle, setChangingProjectTitle] = useState(false);
  const [activeProject, setActiveProject] = useState([]);
  // add new projecat to the database
  const AddProject = () => {
    let name = document.querySelector(".addNameModule input").value;

    // if name is not empty
    if (name.length >= 1) {
      axios
        .post("http://localhost:5000/projects/addproject", {
          name: name,
          nbTask: 0,
          tasks: [],
          archived: false,
        })
        .then(
          () =>
            appContext.changeState({
              ...appContext.state,
              refreshProjects: true,
            }) // refresh project list after one is added
        )
        .catch((err) => console.log("error on adding project request " + err));
      nameNeededSet(false);
    } else {
      document.querySelector(".addNameModuleContent input").placeholder = 'minimum 1 letter';
    }
  };

  const changeCurrentProjectName = () => {

      console.log('change proejct name')
      console.log(activeProject)
      console.log(document.querySelector('.projectNameModalTitle input').value);
      
      axios.post(`http://localhost:5000/projects/edit/${activeProject._id}`,
          { 
            name: document.querySelector(".projectNameModalTitle input").value
          }
        )
        .then(() => {
          appContext.changeState({
            ...appContext.state,
            refreshProjects: true,
          }); // refresh project list after change name
          
          setChangingProjectTitle(false);
        }).catch(err=>console.log(`error while changing singleproject name -> ${err}`))
  }

    const [SidebarState, setSidebarState] = useState(false);

    //useEffect(() => console.log('adfawefawf'))
    const handleClick = () => setSidebarState(!SidebarState);
    const appContext = useContext(AppContext);

    return (
      <div
        className={
          appContext.state.isHiddenSidebar ? "Sidebar hiddenSidebar" : "Sidebar"
        } // hide or show based on global variable
        /*  onClick={
          appContext.state.isHiddenSidebar
            ? () =>
                appContext.changeState({
                  ...appContext.state,
                  isHiddenSidebar: false,
                })
            : undefined
        } */
      >
        <div
          id="sidebarCloser"
          onClick={() =>
            appContext.changeState({
              ...appContext.state,
              isHiddenSidebar: !appContext.state.isHiddenSidebar,
            })
          }
        >
          {appContext.state.isHiddenSidebar ? (
            <ArrowForwardIosIcon
              style={{
                fontSize: "3em",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#F4F3F4",
                transition: "ease-in .5s",
              }}
            />
          ) : (
            <ArrowForwardIosIcon
              style={{
                fontSize: "3em",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) rotate(180deg)",
                color: "#F4F3F4",
                transition: "ease-in .5s",
              }}
            />
          )}
        </div>
        {/* button to close the sidebar */}
        <div className="title">Projects:</div>

        <div className="content">
          <GetProjects
            changingProjectTitle={changingProjectTitle}
            setChangingProjectTitle={setChangingProjectTitle}
            setActiveProject={setActiveProject}
            activeProject={activeProject}
          />
          <div className="addBoard" onClick={() => nameNeededSet(true)}>
            <AddCircleOutlineIcon
              style={{
                fontSize: 45,
                color: "#77865B",
                opacity: "1",
                cursor: "pointer",
              }}
            />
          </div>
          {changingProjectTitle && (
            <div className="projectNameModal">
              <div className="projectNameModalContent">
                <div className="projectNameModalTitle">
                  <input
                    defaultValue={activeProject.name}
                    autoFocus
                    placeholder="provide the title"
                  />
                </div>
                <div className="projectNameModalButtons">
                  <div
                    className="changingNameCancel"
                    onClick={() => setChangingProjectTitle(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className="changingNameYes"
                    onClick={changeCurrentProjectName}
                  >
                    Save
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {nameNeeded ? (
          <div className="addNameModule">
            <div className="addNameModuleContent">
              <input
                autoFocus
                type="text"
                minLength="1"
                required
                placeholder="New project title"
              />
              <div className="addProjectModuleButtons">
                <div
                  className="cancelNamebutton"
                  onClick={() => nameNeededSet(false)}
                >
                  Cancel
                </div>
                <div className="saveNamebutton" onClick={AddProject}>
                  Add
                </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    );
}

export default Sidebar;
