import React from 'react';
import './App.css';
import Provider from './Context/Provider';
import Tabela from './components/Tabela';
//
function App() {
  return (
    <>
      <h1>Star Wars Planets</h1>
      <Provider>
        <Tabela />
      </Provider>
    </>
  );
}

export default App;
