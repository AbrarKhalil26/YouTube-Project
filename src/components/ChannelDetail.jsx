import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FetchFromAPI } from '../utils/FetchFromAPI'
import { Box } from '@mui/material';

import { ChannelCard, Videos } from './'

const ChannelDetail = () => {

  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState([]);
  
  // console.log('channelDetail: ', channelDetail)
  console.log('videos: ', videos)
  
  
  const { id } = useParams();

  useEffect(() => {

    FetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]))
    .catch((err) => console.log('error is ', err));


    FetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items))
    .catch((err) => console.log('error is ', err));

  },[id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,1) 5%, rgba(9,71,121,1) 50%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px'
          }}
          />
          <ChannelCard channelDetail={channelDetail} marginTop={'-110px'}/>
      </Box>

      <Box display='flex' p='2'>
        <Box sx={{ mr: { sm: '100px'}}} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
