import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function VideoItem({ title, thumbnails, videoId, description }) {
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Box sx={{ color: 'black' }}>
        <a
          style={{ textDecoration: 'none' }}
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={thumbnails.high.url}
            alt={description}
            style={{ width: '100%' }}
          />
          <Typography sx={{ color: 'black' }}>{title}</Typography>
        </a>
      </Box>
    </Grid>
  );
}
