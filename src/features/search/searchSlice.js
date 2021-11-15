import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchRequest = createAsyncThunk(
  'search/searchRequest',
  async (query) => {
    return await axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: query,
          maxResults: 5,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: {},
    status: 'idle',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchRequest.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
      })
      .addCase(searchRequest.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
