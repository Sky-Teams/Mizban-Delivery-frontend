import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationFileSelect } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { LuFileText } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const DocumentUpload = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { formData, updateSection } = useRegistration();
  const [fileErrors, setFileErrors] = React.useState({});

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Enforce 50 KB limit for Driver Picture
    const MAX_SIZE = 50 * 1024; // 50 KB in bytes
    if (fieldName === "driverPicture" && file.size > MAX_SIZE) {
      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: t("documents.errors.file_too_large"),
      }));
      return;
    }

    // 2. Clear errors and update context if valid
    setFileErrors((prev) => ({ ...prev, [fieldName]: null }));
    updateSection("documents", { [fieldName]: file });
  };

  const handleNext = () => {
    if (!formData.documents.driverPicture) {
      setFileErrors((prev) => ({
        ...prev,
        driverPicture: t("documents.errors.driver_photo_required"),
      }));
      return;
    }
    navigate("/registration/additional-info");
  };

  const handleSkip = () => {
    navigate("/registration/additional-info");
  };

  return (
    <RegistrationStepWrapper
      title={t("documents.title")}
      currentStep={3}
      icon={<LuFileText />}
    >
      <div className="space-y-4">
        <RegistrationFileSelect
          label={t("documents.driver_picture_label")}
          placeholder={t("documents.driver_picture_placeholder")}
          error={fileErrors.driverPicture}
          fileName={formData.documents.driverPicture?.name}
          onChange={(e) => handleFileChange(e, "driverPicture")}
        />

        <RegistrationFileSelect
          label={t("documents.id_front_label")}
          placeholder={t("documents.id_front_placeholder")}
          fileName={formData.documents.idFront?.name}
          onChange={(e) => handleFileChange(e, "idFront")}
        />

        <RegistrationFileSelect
          label={t("documents.id_back_label")}
          placeholder={t("documents.id_back_placeholder")}
          fileName={formData.documents.idBack?.name}
          onChange={(e) => handleFileChange(e, "idBack")}
        />

        <RegistrationFileSelect
          label={t("documents.license_label")}
          placeholder={t("documents.license_placeholder")}
          fileName={formData.documents.license?.name}
          onChange={(e) => handleFileChange(e, "license")}
        />

        <RegistrationFileSelect
          label={t("documents.vehicle_card_label")}
          placeholder={t("documents.vehicle_card_placeholder")}
          fileName={formData.documents.vehicleCard?.name}
          onChange={(e) => handleFileChange(e, "vehicleCard")}
        />
      </div>
      <StepNavigation onNext={handleNext} onSkip={handleSkip} />
    </RegistrationStepWrapper>
  );
};

export default DocumentUpload;
