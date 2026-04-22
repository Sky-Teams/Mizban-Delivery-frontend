export const isValidAfghanPhone = (phone) => {
  if (!phone) return false;

  // only validation, no cleaning or mutation
  return /^(\+93|93|0)?7\d{8}$/.test(phone);
};
