import React from 'react';
import { Counter } from './features/counter/Counter';
import { Search } from './features/search/Search';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Search />
        <Counter />
      </header>
    </div>
  );
}

export default App;
