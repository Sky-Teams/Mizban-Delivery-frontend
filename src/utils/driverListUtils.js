// UI Positioning

export const getMenuPosition = (element) => {
  if (!element) return null;
  const rect = element.getBoundingClientRect();

  return {
    top: rect.bottom + window.scrollY,
    left: rect.right + window.scrollX - 160,
  };
};
