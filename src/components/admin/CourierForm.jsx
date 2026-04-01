import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toLocaleDigits, toEnglishDigits } from "../../utils/numberConverter";
import i18n from "../../i18n";

export default function CourierForm({ initialData, onSubmit, isEdit = false }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lng = i18n.language;

  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const inputRefs = React.useRef({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    const contact = toEnglishDigits(formData.contactNumber);

    if (!formData.fullName?.trim()) {
      newErrors.fullName = t("fullNameRequired");
    }

    if (!contact?.trim()) {
      newErrors.contactNumber = t("contactRequired");
    } else if (!/^\d+$/.test(contact)) {
      newErrors.contactNumber = t("\contactNumeric");
    } else if (contact.length !== 10) {
      newErrors.contactNumber = t("contactLength");
    }

    if (!formData.email?.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = t("vehicleTypeRequired");
    }

    if (!formData.vehicleRegistration?.trim()) {
      newErrors.vehicleRegistration = t("vehicleRegRequired");
    }

    if (formData.shiftStart && formData.shiftEnd) {
      if (formData.shiftStart >= formData.shiftEnd) {
        newErrors.shiftEnd = t("shiftInvalid");
      }
    }

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
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }

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
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="shrink-0">
          <div className="w-36 h-36 bg-gray-200 rounded-full overflow-hidden">
            {formData.profilePicture instanceof File ? (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : formData.profilePicture ? (
              <img
                src={formData.profilePicture}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : formData.existingImage ? (
              <img
                src={formData.existingImage}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("profileInput").click()}
            className="mt-3 bg-gray-200 px-4 py-1 rounded-lg text-sm"
          >
            {t("profilePicture")}
          </button>

          <input
            id="profileInput"
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 space-y-6 w-full">
          <Input
            label={t("fullName")}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder={t("fullName")}
            ref={(el) => (inputRefs.current.fullName = el)}
          />

          <Input
            label={t("contactNumber")}
            name="contactNumber"
            value={toLocaleDigits(formData.contactNumber, lng)}
            onChange={handleChange}
            error={errors.contactNumber}
            placeholder={toLocaleDigits("0701234567", lng)}
            ref={(el) => (inputRefs.current.contactNumber = el)}
          />

          <Input
            label={t("email")}
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="example@email.com"
            ref={(el) => (inputRefs.current.email = el)}
          />
        </div>
      </div>

      {/* Vehicle */}
      <h2 className="text-xl font-semibold">{t("vehicleInfo")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={t("vehicleType")}
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          options={[t("bike"), t("motorbike"), t("car"), t("van")]}
          error={errors.vehicleType}
          ref={(el) => (inputRefs.current.vehicleType = el)}
        />

        <Input
          label={t("vehicleRegistration")}
          name="vehicleRegistration"
          value={formData.vehicleRegistration}
          onChange={handleChange}
          error={errors.vehicleRegistration}
          placeholder="ABC1234"
          ref={(el) => (inputRefs.current.vehicleRegistration = el)}
        />
      </div>

      {/* Capacity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("maxWeight")}
          name="maxWeightKg"
          type="text"
          value={toLocaleDigits(formData.maxWeightKg, lng)}
          onChange={handleChange}
          placeholder={toLocaleDigits("50", lng)}
        />

        <Input
          label={t("maxPackages")}
          name="maxPackages"
          type="text"
          value={toLocaleDigits(formData.maxPackages, lng)}
          onChange={handleChange}
          placeholder={toLocaleDigits("10", lng)}
        />
      </div>

      {/* Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("shiftStart")}
          name="shiftStart"
          type="time"
          value={formData.shiftStart}
          onChange={handleChange}
        />

        <Input
          label={t("shiftEnd")}
          name="shiftEnd"
          type="time"
          value={formData.shiftEnd}
          onChange={handleChange}
          error={errors.shiftEnd}
          ref={(el) => (inputRefs.current.shiftEnd = el)}
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-sm text-gray-600">{t("homeAddress")}</label>
        <textarea
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          placeholder={t("homeAddress")}
          className="w-full border rounded-xl p-2 mt-2"
        />
      </div>

      <Select
        label={t("status")}
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[t("offline"), t("idle"), t("assigned"), t("delivering")]}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-xl"
        >
          {isEdit ? t("updateCourier") : t("saveCourier")}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-6 py-2 rounded-xl"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}

function Input({ label, error, ...props }, ref) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        ref={ref}
        {...props}
        className="w-full border rounded-xl p-2 mt-2"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, options, error, ...props }, ref) {
  const { t } = useTranslation();
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        ref={ref}
        {...props}
        className="w-full border rounded-xl p-2 mt-2"
      >
        <option value="">{t("select") || t("Select")}</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
