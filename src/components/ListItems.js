import React from 'react';
import { useSelector } from 'react-redux';
import VideoItem from './VideoItem';
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function ListItems() {
  const data = useSelector((state) => state.search.results);
  // const query = useSelector((state) => state.search.query);
  // console.log(items);
  // useEffect(() => {
  //   window.sessionStorage.setItem(query, JSON.stringify(items));
  // }, [items, query]);

  return (
    <div style={{ padding: '2em 0 5em' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data !== null &&
          data.items.map((item) => (
            <VideoItem
              key={item.etag}
              title={item.snippet.title}
              thumbnails={item.snippet.thumbnails}
              description={item.snippet.description}
              videoId={item.id.videoId}
            />
          ))}
      </Grid>
    </div>
  );
}
