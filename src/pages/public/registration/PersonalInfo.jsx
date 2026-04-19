import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { formData, updateSection } = useRegistration();
  const [errors, setErrors] = useState({});

  // Refs to guide/scroll user to the error field
  const fieldRefs = {
    fullName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
  };

  const validate = () => {
    let newErrors = {};
    const { fullName, phone, email } = formData.personalInfo;

    if (!fullName) newErrors.fullName = "This field is required";
    if (!phone) newErrors.phone = "This field is required";
    if (!email) newErrors.email = "This field is required";

    setErrors(newErrors);

    // Focus the first field that has an error
    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      fieldRefs[firstErrorField].current?.focus();
      fieldRefs[firstErrorField].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/registration/vehicle-info");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection("personalInfo", { [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <RegistrationStepWrapper title="Personal Information" currentStep={1}>
      <RegistrationInput
        ref={fieldRefs.fullName}
        label="Full Name"
        name="fullName"
        placeholder="Enter full name"
        error={errors.fullName}
        value={formData.personalInfo.fullName || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        ref={fieldRefs.phone}
        label="Phone number"
        name="phone"
        placeholder="Enter phone number"
        error={errors.phone}
        value={formData.personalInfo.phone || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        ref={fieldRefs.email}
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        error={errors.email}
        value={formData.personalInfo.email || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        label="Date of birth"
        name="dob"
        type="date"
        value={formData.personalInfo.dob || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        label="Address"
        name="address"
        placeholder="Enter your address"
        value={formData.personalInfo.address || ""}
        onChange={handleChange}
      />

      <StepNavigation
        onNext={handleNext}
        onSkip={() => navigate("/registration/vehicle-info")}
      />
    </RegistrationStepWrapper>
  );
};

export default PersonalInfo;
