import React, {useState, useEffect} from 'react';
import "../css/App.scss";
/* import { Redirect } from 'react-router';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; */
import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";
/* import SignUpLoginScreen from './SignUpLoginScreen';
 */export const AppContext = React.createContext();


const App = () => {
  const [appState, setAppState] = useState({
    activeProjectNb:0,
    activeProjectName:null,
    isHiddenSidebar: false,
    // if need refresh
    refreshProjects:false,
    refreshTasks:false,
    refreshSubTasks:false,
    highestCurrentOrder:0
  });

  

  return (
   /*  <Router
      exact
      path="/"
      render={() => {
        return (
          this.state.isUserAuthenticated ?
            <Redirect to="/"  /> :
            <Redirect to="/login" component={SignUpLoginScreen} />
        )
      }}>
 */
      <AppContext.Provider value={{
        state: appState,
        changeState: setAppState
      }}>
        <div className="App">
          {/* <SignUpLoginScreen /> */}
          <Header />
          <Sidebar />
          <Board />
        </div>
      </AppContext.Provider>
    /* </Router> */
    );

  
}

export default App;
