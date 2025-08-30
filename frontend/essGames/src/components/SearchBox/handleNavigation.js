const handleNavigationKey = (array, selectedIndex, setSelectedIndex, onSelect) => {
  const handleKeyDown = (event) => {
    if (array.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < array.length - 1 ? prev + 1 : 0
        );
        
        break;
     
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : array.length - 1
        );
        break;
     
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < array.length) {
          const selectedSuggestion = array[selectedIndex];
          onSelect?.(selectedSuggestion);
        }
        break;
     
      case 'Escape':
        event.preventDefault();
        setSelectedIndex(-1);
        break;
    }
  };
  
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
};

export default handleNavigationKey;

