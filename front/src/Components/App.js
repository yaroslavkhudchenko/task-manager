import React from 'react';
import '../css/App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Board from "./Board";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
