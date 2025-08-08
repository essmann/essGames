export const userHasGame = async (games = null, id) => {
    if(games){
        return games.filter((game)=>(game.id ||game.AppID) == id).length > 0;
    }
    return await window.api.userHasGame(id);
}

export default userHasGame;

