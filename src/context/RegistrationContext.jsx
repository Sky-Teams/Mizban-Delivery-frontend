import React, { createContext, useContext, useState } from "react";

// 1. Create the Context
const RegistrationContext = createContext();

// 2. Custom hook for easy access in your pages
export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider",
    );
  }
  return context;
};

// 3. Provider Component
export const RegistrationProvider = ({ children }) => {
  // We structure the state to match your 7 registration steps
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    vehicleInfo: {
      make: "",
      model: "",
      year: "",
      licensePlate: "",
    },
    documents: {
      idFront: null,
      idBack: null,
      license: null,
    },
    additionalInfo: {
      bio: "",
      preferences: [],
    },
    // Steps 5-7 (Accepted, Pending, Rejected) usually don't store input
    // but you can track the final submission status here.
    status: "idle", // 'idle' | 'submitting' | 'success' | 'error'
  });

  // Helper to update specific nested sections
  // Usage: updateSection('personalInfo', { firstName: 'John' })
  const updateSection = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  // Future-proof: This is where you will eventually put your API call
  const submitRegistration = async () => {
    setFormData((prev) => ({ ...prev, status: "submitting" }));

    try {
      console.log("Sending to backend:", formData);
      // const response = await registrationService.submit(formData);
      setFormData((prev) => ({ ...prev, status: "success" }));
    } catch (error) {
      setFormData((prev) => ({ ...prev, status: "error" }));
      console.error("Submission failed:", error);
    }
  };

  const value = {
    formData,
    updateSection,
    submitRegistration,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
