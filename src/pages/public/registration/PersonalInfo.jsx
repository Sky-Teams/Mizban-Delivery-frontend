import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { validatePersonalInfo } from "../../../utils/registrationValidators";
import { useTranslation } from "react-i18next"; // Added import

const PersonalInfo = () => {
  const { t } = useTranslation(); // Initialize translation
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
    <RegistrationStepWrapper title={t("personal_info.title")} currentStep={1}>
      <RegistrationInput
        ref={fieldRefs.fullName}
        label={t("personal_info.full_name_label")}
        name="fullName"
        placeholder={t("personal_info.full_name_placeholder")}
        error={errors.fullName ? t(errors.fullName) : ""}
        value={formData.personalInfo.fullName || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        ref={fieldRefs.phone}
        label={t("personal_info.phone_label")}
        name="phone"
        placeholder={t("personal_info.phone_placeholder")}
        error={errors.phone ? t(errors.phone) : ""}
        value={formData.personalInfo.phone || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        ref={fieldRefs.email}
        label={t("personal_info.email_label")}
        name="email"
        type="email"
        placeholder={t("personal_info.email_placeholder")}
        error={errors.email ? t(errors.email) : ""}
        value={formData.personalInfo.email || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        label={t("personal_info.dob_label")}
        name="dob"
        type="date"
        value={formData.personalInfo.dob || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        label={t("personal_info.address_label")}
        name="address"
        placeholder={t("personal_info.address_placeholder")}
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
