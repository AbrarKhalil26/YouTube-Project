import React, { useEffect, useState } from 'react'
import { Box , Typography } from '@mui/material'

import { Videos } from '../components';
import { FetchFromAPI } from '../utils/FetchFromAPI';
import { useParams } from 'react-router-dom';

const SearchFeed = () => {

  const [videos, setVideos] = useState([])
  const { searchTerm } = useParams();


  useEffect(()=> {

    FetchFromAPI(`search?part=id,snippet&q=${searchTerm}`)
    .then((data) => setVideos(data.items))
    .catch(error => console.error('API request failed:', error))

  },[searchTerm])



  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2, pl: {sx: 'auto' , md: 4} }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{ color: "white" }}
      >
        Search Results for: <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>

      <Videos videos={videos}/>
    </Box>
  );
}

export default SearchFeed
