export const handleGetPoster = async (id) => {
    try {
        console.log(`Fetching poster for game ID: ${id}...`);
      const poster = await window.api.getPoster(id);
      return poster;
    } catch (error){
      console.error(`Failed to fetch poster for game ID: ${id} `, error);
    }
  };

  export default handleGetPoster;