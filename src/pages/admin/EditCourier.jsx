import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourierStore } from "../../store/useCourierStore";

export default function EditCourier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { couriers, updateCourier } = useCourierStore();

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    profilePicture: null,
    existingImage: "",
    vehicleType: "",
    vehicleRegistration: "",
    maxWeightKg: "",
    maxPackages: "",
    shiftStart: "",
    shiftEnd: "",
    homeAddress: "",
    status: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  useEffect(() => {
    const courierToEdit = couriers.find((c) => String(c.id) === String(id));
    if (courierToEdit) {
      setFormData({
        ...courierToEdit,
        existingImage: courierToEdit.profilePicture || "",
        profilePicture: null, // Reset file input
      });
    }
  }, [id, couriers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourier(id, formData);
      navigate("/couriers");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Loading state if data isn't found yet
  if (!formData.fullName && couriers.length > 0) {
    return <div className="p-10 text-center">Courier not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Courier</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-8 space-y-8"
        >
          {/* -------- Profile Picture Section -------- */}
          {/* Replace your current Edit Profile Section with this to match Add */}
          <div className="flex items-center gap-15">
            <div className="shrink-0">
              <div className="mt-4 flex justify-center items-center w-36 h-36 bg-gray-200 rounded-full relative overflow-hidden">
                {/* Existing logic for previewing images */}
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={formData.existingImage}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("editProfilePicInput").click()
                }
                className="mt-4 py-1 px-5 bg-orange-500 text-white hover:bg-orange-600 transition shadow-md rounded-full"
              >
                Update Picture
              </button>
            </div>

            {/* Wrap your first 3 inputs (Name, Number, Email) in this flex-1 div */}
            <div className="flex-1 space-y-6">
              <Input
                label="Full Name *"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                label="Contact Number *"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  handleChange(e);
                }}
                placeholder="Enter numbers only"
              />
              <Input
                label="Email (Optional)"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* -------- Vehicle -------- */}
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Vehicle Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Vehicle Type"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              options={["Bike", "Motorbike", "Car", "Van"]}
            />
            <Input
              label="Vehicle Registration Number"
              name="vehicleRegistration"
              value={formData.vehicleRegistration}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                handleChange(e);
              }}
            />
          </div>

          {/* -------- Capacity -------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Max Weight (kg)"
              name="maxWeightKg"
              type="number"
              value={formData.maxWeightKg}
              onChange={handleChange}
            />
            <Input
              label="Max Packages"
              name="maxPackages"
              type="number"
              value={formData.maxPackages}
              onChange={handleChange}
            />
          </div>

          {/* -------- Availability -------- */}
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
            />
          </div>

          {/* -------- Address & Status -------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Home Address
              </label>
              <textarea
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                rows="3"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Offline", "Idle", "Assigned", "Delivering"]}
            />
          </div>

          {/* -------- Buttons -------- */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/couriers")}
              className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 shadow-md"
            >
              Update Courier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------- Reusable Components -------- */

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none bg-white"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
