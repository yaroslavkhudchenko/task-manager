import React from 'react';
import '../css/App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";
import { AppContext } from './../Context/AppContext';


const App = () => {
  return (
    <AppContext.Provider>
      <div className="App">
        <Header />
        <Sidebar />
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default App;
