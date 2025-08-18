export const parseArrayString = (text) => {
  if (!text) return "";

  // Try parsing as JSON first (convert single quotes to double quotes)
  try {
    const parsed = JSON.parse(text.replace(/'/g, '"'));
    if (Array.isArray(parsed)) {
      return parsed.map(s => s.trim()).join(', ');
    }
  } catch {
    // fallback: remove brackets and quotes manually
    return text.replace(/[\[\]'"]/g, '').split(',').map(s => s.trim()).join(', ');
  }

  // If not array, return as-is
  return text.trim();
};

// Aliases for clarity
export const parseDevelopers = parseArrayString;
export const parseGenres = parseArrayString;
