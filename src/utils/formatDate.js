export const formatDateForBackend = (date) => {
  return date.replace(/-/g, '/');
};