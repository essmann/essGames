export const parseArrayString = (text) => {
  if (!text) return "";

  try {
    // Remove outer quotes first
    let cleaned = text;
    while (/^["'].*["']$/.test(cleaned)) {
      cleaned = cleaned.slice(1, -1);
    }

    // Replace escaped quotes and backslashes
    cleaned = cleaned.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    // Try to eval or JSON.parse the inner array safely
    const arrMatch = cleaned.match(/\[.*\]/);
    if (arrMatch) {
      const arr = JSON.parse(arrMatch[0].replace(/'/g, '"')); // convert single quotes to double
      return arr.join(", ");
    }

    return cleaned;
  } catch (e) {
    console.error("Failed to parse:", text, e);
    return "";
  }
};




// Aliases
export const parseDevelopers = parseArrayString;
export const parseGenres = parseArrayString;
