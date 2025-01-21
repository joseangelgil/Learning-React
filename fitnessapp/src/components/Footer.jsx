import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Logo from '../assets/images/Logo-1.png'

const Footer = () => {
  return (
    <Box mt='80px' bgcolor='#fff3f4'>
      <Stack gap='4px' alignItems='center' px='40px' pt='24px'>
        <img src={Logo} alt='logo' width='200px' height='40px' />
        <Typography variant='h5' pb='40px' mt='40px'>
          Made following a <a href='https://www.youtube.com/watch?v=KBpoBc98BwM' target='_blank' rel='noopener noreferrer' style={{color: '#000977', textDecoration: 'none'}}>JavaScript Mastery youtube video</a> 
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer