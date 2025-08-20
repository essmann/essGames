import handleRatingChange from "../../../gameAPI/handleRatingChange";
const onRatingChange = async (setRating, setGames, game) => {

    let newRating = prompt("New rating: ");

    return await handleRatingChange(setRating, setGames, game, newRating);
    
} 

export default onRatingChange;