import { useRef, useState, useEffect } from "react";
import { toEnglishDigits } from "../utils/numberConverter";

// Helpers

const cleanNumber = (value = "") => toEnglishDigits(value).replace(/\D/g, "");

const cleanPhone = (value = "") => {
  let v = toEnglishDigits(value).replace(/[^\d+]/g, "");

  const hasPlus = v.startsWith("+");
  v = v.replace(/\+/g, "");

  return hasPlus ? `+${v}` : v;
};

const cleanVehicleReg = (value = "") => value.replace(/[^a-zA-Z0-9-]/g, "");

// Hook

export function useCourierForm(initialData = {}, t, onSubmit) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    vehicleType: "bike",
    vehicleRegistrationNumber: "",
    maxWeightKg: "",
    maxPackages: "",
    shiftStart: "",
    shiftEnd: "",
    address: "",
    status: "offline",
    profilePicture: null,
    existingImage: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) return;

    setFormData((prev) => ({
      ...prev,
      ...initialData,
      vehicleType: initialData.vehicleType || "",
      existingImage: initialData.profilePicture || null,
    }));
  }, [initialData]);

  const inputRefs = useRef({});

  const validate = () => {
    const newErrors = {};
    const phone = formData.phone.trim();

    if (!formData.fullName?.trim()) {
      newErrors.fullName = t("fullNameRequired");
    }

    if (!phone) {
      newErrors.phone = t("contactRequired");
    } else if (!/^(\+93|93|0)?7\d{8}$/.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone = t("contactInvalid");
    }

    if (!formData.email?.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = t("vehicleTypeRequired");
    }

    if (!formData.vehicleRegistrationNumber?.trim()) {
      newErrors.vehicleRegistrationNumber = t("vehicleRegRequired");
    }

    if (
      formData.shiftStart &&
      formData.shiftEnd &&
      formData.shiftStart >= formData.shiftEnd
    ) {
      newErrors.shiftEnd = t("shiftInvalid");
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Change Handler

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files?.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    let finalValue = value;

    if (name === "phone") {
      finalValue = cleanPhone(value);
    }

    if (["maxWeightKg", "maxPackages"].includes(name)) {
      finalValue = cleanNumber(value);
    }

    if (name === "vehicleRegistrationNumber") {
      finalValue = cleanVehicleReg(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: toEnglishDigits(finalValue),
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //  Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length) {
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

  // Refs

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
