import { useRef, useState } from "react";
import { toEnglishDigits } from "../utils/numberConverter";

function normalizeVehicleType(vehicleType = "") {
  const normalizedValue = String(vehicleType).trim().toLowerCase();

  if (!normalizedValue) {
    return "";
  }

  if (["motorbike", "motor bike", "motor-bike", "motorcycle"].includes(normalizedValue)) {
    return "motorcycle";
  }

  return normalizedValue;
}

export function useCourierForm(initialData = {}, t, onSubmit) {
  const [formData, setFormData] = useState(() => ({
    fullName: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleRegistrationNumber: "",
    maxWeightKg: "",
    maxPackages: "",
    shiftStart: "",
    shiftEnd: "",
    address: "",
    status: "",
    profilePicture: null,
    existingImage: null,
    ...initialData,
    vehicleType: normalizeVehicleType(initialData.vehicleType),
  }));
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  const validate = () => {
    const newErrors = {};
    const phone = toEnglishDigits(formData.phone).trim();
    const normalizedPhone = phone.replace(/\s+/g, "");

    if (!formData.fullName?.trim()) newErrors.fullName = t("fullNameRequired");
    if (!normalizedPhone) newErrors.phone = t("contactRequired");
    else if (!/^\+?\d+$/.test(normalizedPhone))
      newErrors.phone = t("contactNumeric");
    else if (!/^(\+93|93|0)?7\d{8}$/.test(normalizedPhone))
      newErrors.phone = t("contactLength");
    if (!formData.email?.trim()) newErrors.email = t("emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = t("emailInvalid");
    if (!formData.vehicleType) newErrors.vehicleType = t("vehicleTypeRequired");
    if (!formData.vehicleRegistrationNumber?.trim())
      newErrors.vehicleRegistrationNumber = t("vehicleRegRequired");
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData((current) => ({ ...current, [name]: files[0] }));
      return;
    }

    let finalValue = toEnglishDigits(value);

    if (["maxWeightKg", "maxPackages"].includes(name)) {
      finalValue = finalValue.replace(/\D/g, "");
    }

    if (name === "phone") {
      finalValue = finalValue.replace(/[^\d+]/g, "");
      const hasLeadingPlus = finalValue.startsWith("+");
      finalValue = `${hasLeadingPlus ? "+" : ""}${finalValue
        .replace(/\+/g, "")
        .trim()}`;
    }

    if (name === "vehicleRegistrationNumber") {
      finalValue = finalValue.replace(/[^a-zA-Z0-9-]/g, "");
    }

    if (name === "vehicleType") {
      finalValue = normalizeVehicleType(finalValue);
    }

    setFormData((current) => ({ ...current, [name]: finalValue }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = inputRefs.current[firstErrorKey];
      if (element) element.focus();
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

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setInputRef,
  };
}
