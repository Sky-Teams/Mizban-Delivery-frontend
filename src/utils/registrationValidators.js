export const validatePersonalInfo = (data) => {
  const errors = {};

  if (!data.fullName?.trim()) {
    errors.fullName = "errors.required";
  }

  if (!data.phone?.trim()) {
    errors.phone = "errors.required";
  } else if (!/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    errors.phone = "errors.invalid_phone";
  }

  if (!data.email?.trim()) {
    errors.email = "errors.required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "errors.invalid_email";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
