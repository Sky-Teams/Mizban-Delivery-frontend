import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { validatePersonalInfo } from "../../../utils/registrationValidators";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { formData, updateSection } = useRegistration();
  const [errors, setErrors] = useState({});

  const fieldRefs = {
    fullName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
  };

  const handleNext = () => {
    const { isValid, errors: newErrors } = validatePersonalInfo(
      formData.personalInfo,
    );

    if (isValid) {
      navigate("/registration/vehicle-info");
    } else {
      setErrors(newErrors);

      // Focus and scroll to the first error field
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField && fieldRefs[firstErrorField].current) {
        const element = fieldRefs[firstErrorField].current;
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection("personalInfo", { [name]: value });
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
