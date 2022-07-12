import React from 'react';
import './index.css';
import Provider from './Context/Provider';
import './App.css';
import Tabela from './components/Tabela';

function App() {
  return (
    <section className="container">
      <Provider>
        <Tabela />
      </Provider>
    </section>
  );
}

export default App;
