import React, {useState} from 'react';
import '../css/App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";
import { AppContext } from './../Context/AppContext';


const App = () => {
  const [activeproject, setactiveproject] = useState(0);

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
