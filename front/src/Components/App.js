import React, {useState} from 'react';
import "../css/App.scss";

import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";
export const AppContext = React.createContext();


const App = () => {
  const [appState, setAppState] = useState({
    activeProjectNb:0,
    activeProjectName:null,
    isHiddenSidebar: false,
    // if need refresh
    refreshProjects:false,
    refreshTasks:false,
    refreshSubTasks:false
  });

  return (
    <AppContext.Provider value={{
      state: appState,
      changeState: setAppState
    }}>
      <div className="App">
        <Header />
        <Sidebar />
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default App;
