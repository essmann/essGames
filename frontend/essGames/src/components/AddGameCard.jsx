import FloatingActionButtonSize from "./FloatingActionButtonSize";

function AddGameCard({setAddGameMenuIsDisplayed}) {
 
  return (
    <div className="game_card_add">
      <FloatingActionButtonSize onClick={()=>{setAddGameMenuIsDisplayed(true)}}/>
      <div className="game_card_title"></div>
    
    </div>
  );
}

export default AddGameCard;
