import { useRef, useState, useEffect } from 'react';
import { VEHICLE_TYPES, DRIVER_STATUS } from '../utils/types';
import { validatePersonalInfo, VALIDATION_RULES } from '../utils/validations';

const DEFAULT_FORM_DATA = {
  fullName: '',
  phone: '',
  email: '',
  vehicleType: VEHICLE_TYPES.MOTORBIKE,
  vehicleRegistrationNumber: '',
  maxWeightKg: 20,
  maxPackages: 10,
  shiftStart: '11:00',
  shiftEnd: '15:00',
  address: '',
  status: DRIVER_STATUS.OFFLINE,
  profilePicture: null,
};

const REQUIRED_FIELD_MESSAGES = {
  fullName: 'fullNameRequired',
  phone: 'contactRequired',
  email: 'emailRequired',
};

const VALIDATION_ERROR_MESSAGES = {
  ERRORS_INVALID_PHONE: 'contactLength',
  ERRORS_INVALID_EMAIL: 'emailInvalid',
};

const getValidationErrorKey = (field, errorKey) =>
  errorKey === 'ERRORS_REQUIRED'
    ? REQUIRED_FIELD_MESSAGES[field]
    : VALIDATION_ERROR_MESSAGES[errorKey] || errorKey;

export function useDriverForm(initialData = {}, onSubmit) {
  const [formData, setFormData] = useState({
    ...DEFAULT_FORM_DATA,
    ...initialData,
  });
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  useEffect(() => {
    setFormData({
      ...DEFAULT_FORM_DATA,
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files?.length) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { errors: personalInfoErrors } = validatePersonalInfo(formData);

    Object.entries(personalInfoErrors).forEach(([field, errorKey]) => {
      newErrors[field] = getValidationErrorKey(field, errorKey);
    });

    const rules = [
      {
        field: 'vehicleType',
        test: !formData.vehicleType,
        msg: 'vehicleTypeRequired',
      },
      {
        field: 'vehicleRegistrationNumber',
        test: !VALIDATION_RULES.required(formData.vehicleRegistrationNumber),
        msg: 'vehicleRegRequired',
      },
      {
        field: 'shiftEnd',
        test: formData.shiftStart && formData.shiftEnd && formData.shiftStart >= formData.shiftEnd,
        msg: 'shiftInvalid',
      },
    ];

    rules.forEach(({ field, test, msg }) => {
      if (test && !newErrors[field]) newErrors[field] = msg;
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      inputRefs.current[firstErrorKey]?.focus();
      return;
    }

    const profilePicture =
      formData.profilePicture instanceof File ? formData.profilePicture : formData.profilePicture || null;

    onSubmit({
      ...formData,
      profilePicture,
    });
  };

  const setInputRef = (name, element) => {
    inputRefs.current[name] = element;
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setInputRef,
  };
}
