import React from 'react';
import { Search } from './features/search/Search';
import ListItems from './components/ListItems';
import Container from '@mui/material/Container';
import './App.css';

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
