import React from 'react';
import '../css/App.scss';
import Header from './Header';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;
