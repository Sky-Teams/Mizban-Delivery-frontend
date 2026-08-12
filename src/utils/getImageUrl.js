import { baseUrl } from "../config/apiClient";

export const getImageUrl = (filePath) => {
  if (!filePath) return '';

  return `${baseUrl}/${filePath}`;

};
