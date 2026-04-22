import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationFileSelect } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { LuFileText } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import useRegistrationStore from "../../../store/useRegistrationStore";

const DocumentUpload = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formData = useRegistrationStore((state) => state.formData);
  const updateSection = useRegistrationStore((state) => state.updateSection);
  const [fileErrors, setFileErrors] = React.useState({});

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_SIZE = 50 * 1024; // 50 KB in bytes
    if (fieldName === "driverPicture" && file.size > MAX_SIZE) {
      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: t("DOCUMENTS_ERRORS_FILE_TOO_LARGE"),
      }));
      return;
    }

    setFileErrors((prev) => ({ ...prev, [fieldName]: null }));
    updateSection("documents", { [fieldName]: file });
  };

  const handleNext = () => {
    if (!formData.documents.driverPicture) {
      setFileErrors((prev) => ({
        ...prev,
        driverPicture: t("DOCUMENTS_ERRORS_DRIVER_PHOTO_REQUIRED"),
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
      title={t("DOCUMENTS_TITLE")}
      currentStep={3}
      icon={<LuFileText />}
    >
      <div className="space-y-4">
        <RegistrationFileSelect
          label={t("DOCUMENTS_DRIVER_PICTURE_LABEL")}
          placeholder={t("DOCUMENTS_DRIVER_PICTURE_PLACEHOLDER")}
          error={fileErrors.driverPicture}
          fileName={formData.documents.driverPicture?.name}
          onChange={(e) => handleFileChange(e, "driverPicture")}
        />

        <RegistrationFileSelect
          label={t("DOCUMENTS_ID_FRONT_LABEL")}
          placeholder={t("DOCUMENTS_ID_FRONT_PLACEHOLDER")}
          fileName={formData.documents.idFront?.name}
          onChange={(e) => handleFileChange(e, "idFront")}
        />

        <RegistrationFileSelect
          label={t("DOCUMENTS_ID_BACK_LABEL")}
          placeholder={t("DOCUMENTS_ID_BACK_PLACEHOLDER")}
          fileName={formData.documents.idBack?.name}
          onChange={(e) => handleFileChange(e, "idBack")}
        />

        <RegistrationFileSelect
          label={t("DOCUMENTS_LICENSE_LABEL")}
          placeholder={t("DOCUMENTS_LICENSE_PLACEHOLDER")}
          fileName={formData.documents.license?.name}
          onChange={(e) => handleFileChange(e, "license")}
        />

        <RegistrationFileSelect
          label={t("DOCUMENTS_VEHICLE_CARD_LABEL")}
          placeholder={t("DOCUMENTS_VEHICLE_CARD_PLACEHOLDER")}
          fileName={formData.documents.vehicleCard?.name}
          onChange={(e) => handleFileChange(e, "vehicleCard")}
        />
      </div>
      <StepNavigation onNext={handleNext} onSkip={handleSkip} />
    </RegistrationStepWrapper>
  );
};

export default DocumentUpload;
