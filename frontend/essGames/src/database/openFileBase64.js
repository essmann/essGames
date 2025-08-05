export const openFileBase64 = async (game) => {
    try {
      const image = await window.api.openImageFile();
      return image;
    } catch (error){
      console.error("Failed to open file: ", error);
    }
  };

  export default openFileBase64;