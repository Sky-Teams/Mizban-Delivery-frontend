import { useRef, useState, useEffect } from "react";
import { toEnglishDigits } from "../utils/numberConverter";
import { VEHICLE_TYPES, COURIER_STATUS } from "../utils/types";
import {
  cleanNumber,
  cleanPhone,
  cleanVehicleReg,
  isValidAfghanPhone,
} from "../utils/formUtils";

// Map field names to their specific cleaning logic
const FIELD_CLEANERS = {
  phone: cleanPhone,
  maxWeightKg: cleanNumber,
  maxPackages: cleanNumber,
  vehicleRegistrationNumber: cleanVehicleReg,
};

export function useCourierForm(initialData = {}, t, onSubmit) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    vehicleType: VEHICLE_TYPES.BIKE,
    vehicleRegistrationNumber: "",
    maxWeightKg: "",
    maxPackages: "",
    shiftStart: "",
    shiftEnd: "",
    address: "",
    status: COURIER_STATUS.OFFLINE,
    profilePicture: null,
    existingImage: null,
  });

  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) return;
    setFormData((prev) => ({
      ...prev,
      ...initialData,
      vehicleType: initialData.vehicleType || VEHICLE_TYPES.BIKE,
      existingImage: initialData.profilePicture || null,
    }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files?.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    // Use specific cleaner if it exists, otherwise use raw value
    const cleaner = FIELD_CLEANERS[name];
    const cleanedValue = cleaner ? cleaner(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: toEnglishDigits(cleanedValue),
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    // Declarative Rules List
    const rules = [
      {
        field: "fullName",
        test: !formData.fullName?.trim(),
        msg: t("fullNameRequired"),
      },
      {
        field: "phone",
        test: !isValidAfghanPhone(formData.phone),
        msg: t("contactInvalid"),
      },
      {
        field: "email",
        test: !/^\S+@\S+\.\S+$/.test(formData.email),
        msg: t("emailInvalid"),
      },
      {
        field: "vehicleType",
        test: !formData.vehicleType,
        msg: t("vehicleTypeRequired"),
      },
      {
        field: "vehicleRegistrationNumber",
        test: !formData.vehicleRegistrationNumber?.trim(),
        msg: t("vehicleRegRequired"),
      },
      {
        field: "shiftEnd",
        test:
          formData.shiftStart &&
          formData.shiftEnd &&
          formData.shiftStart >= formData.shiftEnd,
        msg: t("shiftInvalid"),
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

    onSubmit({
      ...formData,
      profilePicture:
        formData.profilePicture instanceof File
          ? formData.profilePicture
          : formData.existingImage || null,
    });
  };

  const setInputRef = (name, element) => {
    inputRefs.current[name] = element;
  };

  return { formData, errors, handleChange, handleSubmit, setInputRef };
}
