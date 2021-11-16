import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, searchRequest } from './searchSlice';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export function Search() {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchRequest(query));
  };

  return (
    <Paper
      onSubmit={handleSearch}
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Youtube'
        inputProps={{ 'aria-label': 'search youtube' }}
        value={query}
        name='search'
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
