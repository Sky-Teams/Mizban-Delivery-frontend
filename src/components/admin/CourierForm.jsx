import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toEnglishDigits } from "../../utils/numberConverter";
import CourierProfile from "../common/Courier/CourierProfile";
import CourierVehicle from "../common/Courier/CourierVehicle";
import CourierCapacity from "../common/Courier/CourierCapacity";
import CourierAvailability from "../common/Courier/CourierAvailability";
import CourierAddress from "../common/Courier/CourierAddress";
import FormButtons from "../common/Courier/FormButtons";

export default function CourierForm({
  initialData = {},
  onSubmit,
  isEdit = false,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState(() => ({
    fullName: "",
    contactNumber: "",
    email: "",
    vehicleType: "",
    vehicleRegistration: "",
    maxWeightKg: "",
    maxPackages: "",
    shiftStart: "",
    shiftEnd: "",
    homeAddress: "",
    status: "",
    profilePicture: null,
    existingImage: null,
    ...initialData,
  }));

  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  const validate = () => {
    const newErrors = {};
    const contact = toEnglishDigits(formData.contactNumber);

    if (!formData.fullName?.trim()) newErrors.fullName = t("fullNameRequired");
    if (!contact?.trim()) newErrors.contactNumber = t("contactRequired");
    else if (!/^\d+$/.test(contact))
      newErrors.contactNumber = t("contactNumeric");
    else if (contact.length !== 10)
      newErrors.contactNumber = t("contactLength");
    if (!formData.email?.trim()) newErrors.email = t("emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = t("emailInvalid");
    if (!formData.vehicleType) newErrors.vehicleType = t("vehicleTypeRequired");
    if (!formData.vehicleRegistration?.trim())
      newErrors.vehicleRegistration = t("vehicleRegRequired");
    if (
      formData.shiftStart &&
      formData.shiftEnd &&
      formData.shiftStart >= formData.shiftEnd
    )
      newErrors.shiftEnd = t("shiftInvalid");

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    let finalValue = toEnglishDigits(value);

    if (["contactNumber", "maxWeightKg", "maxPackages"].includes(name)) {
      finalValue = finalValue.replace(/\D/g, "");
    }

    if (name === "vehicleRegistration") {
      finalValue = finalValue.replace(/[^a-zA-Z0-9]/g, "");
    }

    setFormData({ ...formData, [name]: finalValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = inputRefs.current[firstErrorKey];
      if (el) el.focus();
      return;
    }

    const dataToSubmit = {
      ...formData,
      profilePicture:
        formData.profilePicture instanceof File
          ? formData.profilePicture
          : formData.existingImage || null,
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-md p-8 space-y-8"
    >
      <CourierProfile
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        setRef={(name, el) => {
          inputRefs.current[name] = el;
        }}
      />
      <CourierVehicle
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        setRef={(name, el) => {
          inputRefs.current[name] = el;
        }}
      />
      <CourierCapacity formData={formData} handleChange={handleChange} />
      <CourierAvailability
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        setRef={(name, el) => {
          inputRefs.current[name] = el;
        }}
      />
      <CourierAddress formData={formData} handleChange={handleChange} />
      <FormButtons navigate={navigate} isEdit={isEdit} t={t} />
    </form>
  );
}
