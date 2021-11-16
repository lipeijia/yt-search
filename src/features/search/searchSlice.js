import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `https://www.googleapis.com/youtube/v3/search`;
export const searchRequest = createAsyncThunk(
  'search/searchRequest',
  async (query) => {
    return await axios
      .get(BASE_URL, {
        params: {
          part: 'snippet',
          q: query,
          maxResults: 24,
          type: 'video',
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  }
);

export const scrollRequest = createAsyncThunk(
  'search/scrollRequest',
  async (query, nextPageToken) => {
    return await axios
      .get(BASE_URL, {
        params: {
          part: 'snippet',
          q: query,
          maxResults: 24,
          type: 'video',
          pageToken: nextPageToken,
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
    items: null,
    status: 'idle',
    nextPageToken: '',
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
        state.items = action.payload.items;
        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(searchRequest.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(scrollRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(scrollRequest.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.items.push(...action.payload.items);
        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(scrollRequest.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
