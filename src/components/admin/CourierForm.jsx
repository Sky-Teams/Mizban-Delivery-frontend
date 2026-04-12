import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CourierForm({ initialData, onSubmit, isEdit = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => initialData);
  const { t } = useTranslation()

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    let finalValue = value;

    if (["contactNumber", "maxWeightKg", "maxPackages"].includes(name)) {
      finalValue = value.replace(/\D/g, "");
    }

    if (name === "vehicleRegistration") {
      finalValue = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      profilePicture: formData.profilePicture
        ? URL.createObjectURL(formData.profilePicture)
        : formData.existingImage || "https://via.placeholder.com",
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
              />
            ) : formData.profilePicture ? (
              <img
                src={formData.profilePicture}
                className="w-full h-full object-cover"
              />
            ) : formData.existingImage ? (
              <img
                src={formData.existingImage}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {/* Profile Picture Button */}
          <button
            type="button"
            onClick={() => document.getElementById("profileInput").click()}
            className="mt-3 bg-gray-200 px-4 py-1 rounded-lg text-sm"
          >
            {t("Profile Picture")}
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
            label={t("Full Name *")}
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <Input
            label={t("Contact Number *")}
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <Input
            label={t("Email")}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Vehicle */}
      <h2 className="text-xl font-semibold">{t("Vehicle Information")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label={t("Vehicle Type")}
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          options={[ t("Bike"), t("Motorbike"), t("Car"), t("Van")]}
        />

        <Input
          label={t("Vehicle Registration")}
          name="vehicleRegistration"
          value={formData.vehicleRegistration}
          onChange={handleChange}
        />
      </div>

      {/* Capacity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("Max Weight Kg")}
          name="maxWeightKg"
          type="number"
          value={formData.maxWeightKg}
          onChange={handleChange}
        />

        <Input
          label={t("Max Packages")}
          name="maxPackages"
          type="number"
          value={formData.maxPackages}
          onChange={handleChange}
        />
      </div>

      {/* Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("Shift Start")}
          name="shiftStart"
          type="time"
          value={formData.shiftStart}
          onChange={handleChange}
        />

        <Input
          label={t("Shift End")}
          name="shiftEnd"
          type="time"
          value={formData.shiftEnd}
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-sm text-gray-600">{t("Home Address")}</label>
        <textarea
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          className="w-full border rounded-xl p-2 mt-2"
        />
      </div>

      <Select
        label={t("Status")}
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[ t("Offline"), t("Idle"), t("Assigned"), t("Delivering")]}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-xl"
        >
          {isEdit ? t("Update Courier") : t("Save Courier")}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-6 py-2 rounded-xl"
        >
          {t("Cancel")}
        </button>
      </div>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input {...props} className="w-full border rounded-xl p-2 mt-2" />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select {...props} className="w-full border rounded-xl p-2 mt-2">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
