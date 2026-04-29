export const isWithinDateRange = (date, startDate, endDate) => {
  const time = new Date(date).getTime();
  if (startDate) {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    if (time < start) return false;
  }
  if (endDate) {
    const end = new Date(endDate).setHours(23, 59, 59, 999);
    if (time > end) return false;
  }
  return true;
};
