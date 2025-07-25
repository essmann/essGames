import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function CustomizedRating({onRating, rating}) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
  <Rating 
    name="customized-10" 
    defaultValue={rating} 
    max={5} 
    size="small" 
    precision={0.5} 
    sx={{
      '.MuiRating-iconFilled': {
        color: 'white', // Change to your desired color
      },
      '.MuiRating-iconEmpty': {
        color: 'gray', // Color for empty icons
      }
    }
  } 
  onChange={(event, value)=>onRating(value)}
  />
</Box>
  );
}
