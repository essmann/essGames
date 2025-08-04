import AddGameInput from "./AddGameInput";
function AddGameMenu({game}) {
    return (  
<>
    <AddGameInput/> {/* This handles the input and vanishes when pressing escape or selecting a game */}
    <div className="add_game_menu">
        
        </div>
</>
 );
}

export default AddGameMenu;