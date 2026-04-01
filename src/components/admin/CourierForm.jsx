import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function CourierForm({ initialData, onSubmit, isEdit = false }) {
  const navigate = useNavigate();

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

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.contactNumber?.trim()) {
      newErrors.contactNumber = "Contact Number is required";
    } else if (!/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact Number must be numeric";
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = "Contact Number must be exactly 10 digits";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Vehicle Type is required";
    }

    if (!formData.vehicleRegistration?.trim()) {
      newErrors.vehicleRegistration = "Vehicle Registration is required";
    }

    if (formData.shiftStart && formData.shiftEnd) {
      if (formData.shiftStart >= formData.shiftEnd) {
        newErrors.shiftEnd = "Shift End must be after Shift Start";
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

    let finalValue = value;

    if (["contactNumber", "maxWeightKg", "maxPackages"].includes(name)) {
      finalValue = value.replace(/\D/g, "");
    }

    if (name === "vehicleRegistration") {
      finalValue = value.replace(/[^a-zA-Z0-9]/g, "");
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
            Profile Picture
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
            label="Full Name *"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="Enter full name"
            ref={(el) => (inputRefs.current.fullName = el)}
          />

          <Input
            label="Contact Number *"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            error={errors.contactNumber}
            placeholder="0701234567"
            ref={(el) => (inputRefs.current.contactNumber = el)}
          />

          <Input
            label="Email *"
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
      <h2 className="text-xl font-semibold">Vehicle Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Vehicle Type *"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          options={["Bike", "Motorbike", "Car", "Van"]}
          error={errors.vehicleType}
          ref={(el) => (inputRefs.current.vehicleType = el)}
        />

        <Input
          label="Vehicle Registration *"
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
          label="Max Weight Kg"
          name="maxWeightKg"
          type="number"
          value={formData.maxWeightKg}
          onChange={handleChange}
          placeholder="e.g. 50"
        />

        <Input
          label="Max Packages"
          name="maxPackages"
          type="number"
          value={formData.maxPackages}
          onChange={handleChange}
          placeholder="e.g. 10"
        />
      </div>

      {/* Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Shift Start"
          name="shiftStart"
          type="time"
          value={formData.shiftStart}
          onChange={handleChange}
        />

        <Input
          label="Shift End"
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
        <label className="text-sm text-gray-600">Home Address</label>
        <textarea
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          placeholder="Enter home address"
          className="w-full border rounded-xl p-2 mt-2"
        />
      </div>

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={["Offline", "Idle", "Assigned", "Delivering"]}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-xl"
        >
          {isEdit ? "Update Courier" : "Save Courier"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-6 py-2 rounded-xl"
        >
          Cancel
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
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        ref={ref}
        {...props}
        className="w-full border rounded-xl p-2 mt-2"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
