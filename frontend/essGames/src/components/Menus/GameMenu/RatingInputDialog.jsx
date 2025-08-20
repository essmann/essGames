import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
function RatingInputDialog({ rating, setRating }) {
    const [newRating, setNewRating] = useState(rating);
    
    const handleInput = (input) =>{
        
    }
    const handleClose = () => {

    }
    return (
    <ClickAwayListener onClickAway={()=>setRating(newRating)}>
      <div className="dialog_popup">
        <div className="rating_input_dialog absolute">
          <h2>Enter your rating</h2>
          <input placeholder={rating} onChange={(e)=>setNewRating(e.currentTarget.value)} />
        </div>
      </div>
      ;
    </ClickAwayListener>
  );
}

export default RatingInputDialog;
