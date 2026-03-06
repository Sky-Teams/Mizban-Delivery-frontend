import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CourierContext } from "../../context/CourierContext";

export default function EditCourier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { couriers, fetchCouriers } = useContext(CourierContext);

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

  useEffect(() => {
    const courierToEdit = couriers.find((c) => String(c.id) === String(id));
    if (courierToEdit) {
      setFormData({
        ...courierToEdit,
        profilePicture: null,
        existingImage: courierToEdit.profilePicture || "",
      });
    }
  }, [id, couriers]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data (keep existing image if no new file is uploaded)
    const updatedData = {
      ...formData,
      profilePicture: formData.profilePicture
        ? URL.createObjectURL(formData.profilePicture)
        : formData.existingImage,
    };

    // Remove the temporary 'existingImage' field before sending to DB
    delete updatedData.existingImage;

    try {
      const response = await fetch(`http://localhost:3500/couriers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        await fetchCouriers(); // Refresh global list
        navigate("/couriers"); // Redirect back
      }
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
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Profile Picture
            </label>

            <div className="mt-4 flex flex-col items-start">
              {/* Circle Preview */}
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : formData.existingImage ? (
                  <img
                    src={formData.existingImage}
                    alt="Existing"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7h4l2-2h6l2 2h4v12H3V7z"
                    />
                  </svg>
                )}
              </div>

              {/* Update Button */}
              <button
                type="button"
                onClick={() =>
                  document.getElementById("editProfilePicInput").click()
                }
                className="mt-4 text-sm text-orange-500 hover:underline"
              >
                Update Picture
              </button>

              <input
                id="editProfilePicInput"
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>

          {/* -------- Basic Info -------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* -------- Vehicle -------- */}
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
              onChange={handleChange}
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
        className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
