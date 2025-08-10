async function getCatalogPoster(id, gameCatalogDbAll){
    try {
    const blob_image = await gameCatalogDbAll('SELECT image FROM posters WHERE id = ?', [id]);

    if (blob_image.length === 0 || !blob_image[0].image) {
      console.warn(`No image found for ID ${id}`);
      return null;
    }

    // Detect image type (optional, or default to e.g., "image/jpeg")
    const mimeType = 'image/jpeg'; // or 'image/png', depending on your actual image format
    const base64Image = blob_image[0].image.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    console.log(`Fetched and encoded image for ID ${id}`);
    return dataUrl;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
}

module.exports = getCatalogPoster;