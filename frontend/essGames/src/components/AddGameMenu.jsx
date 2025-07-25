import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ClickAwayListener from '@mui/material/ClickAwayListener';
function AddGameMenu({setAddGameMenuIsDisplayed}) {
   

  return (
    <ClickAwayListener onClickAway={()=>setAddGameMenuIsDisplayed(false)}>
    <div className="game_add_menu"  >
        <div className="game_add_menu_poster"> 
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab size="small" color="" aria-label="add" onClick={()=>console.log("hi")}>
                    <AddIcon />
                </Fab>
                
                </Box>
        </div>
    </div>
    </ClickAwayListener>
  );
}

export default AddGameMenu;
