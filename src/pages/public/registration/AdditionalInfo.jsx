import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInputWithIcon } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { LuInfo, LuPhone, LuUser } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, updateSection, submitRegistration } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection("additionalInfo", { [name]: value });
  };

  const handleFinish = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const isSuccess = await submitRegistration();
    setIsSubmitting(false);

    if (isSuccess) {
      navigate("/registration/pending");
    } else {
      alert(t("additional_info.error_message"));
    }
  };

  return (
    <RegistrationStepWrapper
      title={t("additional_info.title")}
      currentStep={4}
      icon={<LuInfo className="text-orange-500 w-8 h-8" />}
    >
      <p className="text-center text-xs text-gray-500 mb-2">
        {t("additional_info.optional_description")}
      </p>

      <div className="space-y-5">
        <RegistrationInputWithIcon
          label={t("additional_info.emergency_contact_label")}
          name="emergencyContact"
          placeholder={t("additional_info.emergency_contact_placeholder")}
          icon={LuPhone}
          value={formData.additionalInfo.emergencyContact || ""}
          onChange={handleChange}
        />

        <RegistrationInputWithIcon
          label={t("additional_info.relationship_label")}
          name="relationship"
          placeholder={t("additional_info.relationship_placeholder")}
          icon={LuUser}
          value={formData.additionalInfo.relationship || ""}
          onChange={handleChange}
        />
      </div>

      <StepNavigation
        onNext={handleFinish}
        onSkip={handleFinish}
        isLoading={isSubmitting}
      />
    </RegistrationStepWrapper>
  );
};

export default AdditionalInfo;
