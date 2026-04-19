import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider",
    );
  }
  return context;
};

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // MATCHES: PersonalInfo.jsx
    personalInfo: {
      fullName: "",
      phone: "",
      email: "",
      dob: "",
      address: "",
    },
    // MATCHES: VehicleInfo.jsx
    vehicleInfo: {
      nameModel: "",
      type: "",
      licensePlate: "",
      fuelType: "",
      color: "",
    },
    // MATCHES: DocumentUpload.jsx
    documents: {
      driverPicture: null,
      idFront: null,
      idBack: null,
      license: null,
      vehicleCard: null,
    },
    // MATCHES: AdditionalInfo.jsx
    additionalInfo: {
      emergencyContact: "",
      relationship: "",
    },
    status: "idle",
  });

  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const submitRegistration = async () => {
    setFormData((prev) => ({ ...prev, status: "submitting" }));

    try {
      console.log("Sending to backend:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormData((prev) => ({ ...prev, status: "success" }));
      return true; // Explicitly return success
    } catch (error) {
      setFormData((prev) => ({ ...prev, status: "error" }));
      console.error("Submission failed:", error);
      return false; // Explicitly return failure
    }
  };

  return (
    <RegistrationContext.Provider
      value={{ formData, updateSection, submitRegistration }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
