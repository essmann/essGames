 export const parseDevelopers = (text) => {
    if (!text || text.length === 0) return text;
    if(!text.startsWith("[")){return text;};
    return text.substring(2, text.length - 2);
  };

export  const parseGenres = (text) => {
    if (!text || text.length === 0) return text;
    if(!text.startsWith("[")){return text;};

    text = text.substring(1, text.length -1);
    text = text.split(",");
    text = text.map((genre)=>{
      genre = genre.replace("'", "");
      genre = genre.substring(0,genre.length -1);
      return genre;
    });
    text = text.join(" ");
    return text;
  }
