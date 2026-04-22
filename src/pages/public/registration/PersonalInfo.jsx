import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { validatePersonalInfo } from "../../../utils/validations";
import { useTranslation } from "react-i18next";
import useRegistrationStore from "../../../store/useRegistrationStore";

const PersonalInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formData = useRegistrationStore((state) => state.formData);
  const updateSection = useRegistrationStore((state) => state.updateSection);
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

      // Focus the first field that has an error
      const errorFields = Object.keys(newErrors);
      if (errorFields.length > 0) {
        const firstField = errorFields[0];
        if (fieldRefs[firstField]?.current) {
          fieldRefs[firstField].current.focus();
          fieldRefs[firstField].current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
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
    <RegistrationStepWrapper title={t("PERSONAL_INFO_TITLE")} currentStep={1}>
      <RegistrationInput
        ref={fieldRefs.fullName}
        label={t("PERSONAL_INFO_FULL_NAME_LABEL")}
        name="fullName"
        placeholder={t("PERSONAL_INFO_FULL_NAME_PLACEHOLDER")}
        error={errors.fullName ? t(errors.fullName) : ""}
        value={formData.personalInfo.fullName || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        ref={fieldRefs.phone}
        label={t("PERSONAL_INFO_PHONE_LABEL")}
        name="phone"
        placeholder={t("PERSONAL_INFO_PHONE_PLACEHOLDER")}
        error={errors.phone ? t(errors.phone) : ""}
        value={formData.personalInfo.phone || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        ref={fieldRefs.email}
        label={t("PERSONAL_INFO_EMAIL_LABEL")}
        name="email"
        type="email"
        placeholder={t("PERSONAL_INFO_EMAIL_PLACEHOLDER")}
        error={errors.email ? t(errors.email) : ""}
        value={formData.personalInfo.email || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        label={t("PERSONAL_INFO_DOB_LABEL")}
        name="dob"
        type="date"
        value={formData.personalInfo.dob || ""}
        onChange={handleChange}
      />

      <RegistrationInput
        label={t("PERSONAL_INFO_ADDRESS_LABEL")}
        name="address"
        placeholder={t("PERSONAL_INFO_ADDRESS_PLACEHOLDER")}
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
