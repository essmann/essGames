export const parseArrayString = (text) => {
  if (!text) return "";

  // Remove all backslashes, brackets, and quotes
  let cleaned = text.replace(/[\\[\]'"]/g, '').trim();

  // If there are commas, split and rejoin cleanly
  return cleaned.split(',').map(s => s.trim()).filter(Boolean).join(', ');
};

// Aliases
export const parseDevelopers = parseArrayString;
export const parseGenres = parseArrayString;
