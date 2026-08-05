const API = import.meta.env.VITE_API_BASE_URL;
export const getImageUrl = (filePath) => {
  if (!filePath) return '';

  return `${API}/${filePath}`;

};
