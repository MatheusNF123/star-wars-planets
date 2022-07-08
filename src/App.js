import React from 'react';
import './App.css';
import Provider from './Context/Provider';
import Tabela from './components/Tabela';
//
function App() {
  return (
    <Provider>
      <Tabela />
    </Provider>
  );
}

export default App;
