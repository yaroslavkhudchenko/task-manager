import React, {useState} from 'react';
import '../css/App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";
export const AppContext = React.createContext();


const App = () => {
  const [activeproject, setactiveproject] = useState({
    activeProjectNb:null,
    activeProjectName:""
  });
  

  return (
    <AppContext.Provider value={{
      state: activeproject,
      changeState: setactiveproject
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
