import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { Sidebar , Videos } from '../components';
import { FetchFromAPI } from '../utils/FetchFromAPI';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])



  useEffect(()=> {
    setVideos([]);

    FetchFromAPI(`search?part=id,snippet&q=${selectedCategory}`)
    .then((data) => setVideos(data.items))
    .catch(error => {
      console.error('API request failed:', error);
    });
  },[selectedCategory])



  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 JSM Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2, pl: {sx: 'auto' , md: 4} }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>

        <Videos videos={videos}/>
      </Box>
    </Stack>
  );
}

export default Feed
