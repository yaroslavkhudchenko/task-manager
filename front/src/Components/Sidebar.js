import React,{useEffect, useState, useContext} from 'react';
import '../css/Sidebar.scss';
import { GetProjects } from './../Hooks/GetProjects';
import { AppContext } from './../Components/App';
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Sidebar = () => {
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
                transform: "translate(-50%,-50%)",
                color: "white",
              }}
            />
          ) : (
            <CloseIcon
              style={{
                fontSize: "3em",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: "white",
              }}
            />
          )}
        </div>
        {/* button to close the sidebar */}
        <div className="title">Projects:</div>
        <div className="content">
          <GetProjects />
        </div>
      </div>
    );
}

export default Sidebar;
