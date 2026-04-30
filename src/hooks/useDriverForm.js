import { useRef, useState, useEffect } from 'react';
import { VEHICLE_TYPES, DRIVER_STATUS } from '../utils/types';
import { validatePersonalInfo, VALIDATION_RULES } from '../utils/validations';

const DEFAULT_FORM_DATA = {
  fullName: '',
  phone: '',
  email: '',
  vehicleType: VEHICLE_TYPES.MOTORBIKE,
  vehicleRegistrationNumber: '',
  maxWeightKg: '',
  maxPackages: '',
  shiftStart: '',
  shiftEnd: '',
  address: '',
  status: DRIVER_STATUS.OFFLINE,
  profilePicture: null,
};

const translateValidationError = (field, errorKey, t) => {
  if (errorKey === 'ERRORS_REQUIRED') {
    if (field === 'fullName') return t('fullNameRequired');
    if (field === 'phone') return t('contactInvalid');
    if (field === 'email') return t('emailInvalid');
  }

  if (errorKey === 'ERRORS_INVALID_PHONE') {
    return t('contactInvalid');
  }

  if (errorKey === 'ERRORS_INVALID_EMAIL') {
    return t('emailInvalid');
  }

  return errorKey;
};

export function useDriverForm(initialData = {}, t, onSubmit) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) return;

    setFormData({
      ...DEFAULT_FORM_DATA,
      ...initialData,
      vehicleType: initialData.vehicleType || VEHICLE_TYPES.MOTORBIKE,
      profilePicture: initialData.profilePicture || null,
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
      newErrors[field] = translateValidationError(field, errorKey, t);
    });

    const rules = [
      {
        field: 'vehicleType',
        test: !formData.vehicleType,
        msg: t('vehicleTypeRequired'),
      },
      {
        field: 'vehicleRegistrationNumber',
        test: !VALIDATION_RULES.required(formData.vehicleRegistrationNumber),
        msg: t('vehicleRegRequired'),
      },
      {
        field: 'shiftEnd',
        test: formData.shiftStart && formData.shiftEnd && formData.shiftStart >= formData.shiftEnd,
        msg: t('shiftInvalid'),
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
