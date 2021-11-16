import React from 'react';
import Container from '@mui/material/Container';
import { Search } from './features/search/Search';
import './App.css';
import ListItems from './components/ListItems';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Container maxWidth='sm'>
          <Search />
        </Container>
      </header>
      <Container maxWidth='lg'>
        <ListItems />
      </Container>
    </div>
  );
}

export default App;
