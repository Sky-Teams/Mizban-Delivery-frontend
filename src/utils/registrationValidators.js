export const validatePersonalInfo = (data) => {
  const errors = {};

  if (!data.fullName?.trim()) {
    errors.fullName = "This field is required";
  }

  if (!data.phone?.trim()) {
    errors.phone = "This field is required";
  } else if (!/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.email?.trim()) {
    errors.email = "This field is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
