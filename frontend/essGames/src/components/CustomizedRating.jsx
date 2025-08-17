import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function CustomizedRating({onRating, rating, size}) {
  
  
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
  <Rating 
    name="customized-10" 
    value={rating} // <-- Change this line
    max={5} 
    size={size || "small"} 
    precision={0.5} 
    sx={{
      '.MuiRating-iconFilled': {
        color: '#bec3c5ff'
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