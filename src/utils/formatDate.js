export const formatDateForBackend = (date) => {
  return date.replace(/-/g, '/');
};

export const formatDate = (date) => {
  if (!date) return '-';

  return new Intl.DateTimeFormat({
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};
