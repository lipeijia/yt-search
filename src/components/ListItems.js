import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VideoItem from './VideoItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { scrollRequest } from '../features/search/searchSlice';
import Loader from 'react-loader-spinner';

export default function ListItems() {
  const { items, query, status, nextPageToken } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  // detect when user scrolls to the bottom of the page
  // https://www.youtube.com/watch?v=NZKUirTtxcg
  const observer = useRef();
  const lastVideoElementRef = useCallback(
    (node) => {
      if (status === 'loading') return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('IntersectionObserver: loading more videos');
          console.log(nextPageToken);
          dispatch(scrollRequest(query, nextPageToken));
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, dispatch, nextPageToken, query, observer]
  );
  return (
    <div style={{ padding: '2em 0 5em' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {items !== null &&
          items.map((item, index) => {
            if (index === items.length - 1) {
              return (
                <Box ref={lastVideoElementRef} key={item.etag}>
                  <VideoItem
                    title={item.snippet.title}
                    thumbnails={item.snippet.thumbnails}
                    description={item.snippet.description}
                    videoId={item.id.videoId}
                  />
                </Box>
              );
            } else {
              return (
                <VideoItem
                  key={item.etag}
                  title={item.snippet.title}
                  thumbnails={item.snippet.thumbnails}
                  description={item.snippet.description}
                  videoId={item.id.videoId}
                />
              );
            }
          })}
      </Grid>
      {status === 'loading' && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Loader type='TailSpin' color='gray' height={80} width={80} />
        </Box>
      )}
    </div>
  );
}
