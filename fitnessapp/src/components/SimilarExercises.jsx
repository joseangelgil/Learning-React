import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import HorizontalScrollbar from './HorizontalScrollbar'
import Loader from './Loader'

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' }}}>
      <Typography variant='h3' mt={2} mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          p: '20px'
        }}
      >
        {targetMuscleExercises.length ? <HorizontalScrollbar data={targetMuscleExercises} /> : <Loader />}
      </Box>
      <Typography variant='h3' mt={2} mb={5}>
        Exercises that use the same equipment
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          p: '20px'
        }}
      >
        {equipmentExercises.length ? <HorizontalScrollbar data={equipmentExercises} /> : <Loader />}
      </Box>
    </Box>
  )
}

export default SimilarExercises