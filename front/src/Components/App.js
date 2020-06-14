import React, {useState} from 'react';
import "../css/App.scss";

import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";
import SignUpLoginScreen from "./SignUpLoginScreen";
export const AppContext = React.createContext();


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
    <AppContext.Provider value={{
      state: appState,
      changeState: setAppState
    }}>
      <div className="App">
        <SignUpLoginScreen />
        <Header />
        <Sidebar />
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default App;
