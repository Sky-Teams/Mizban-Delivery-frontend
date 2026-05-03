import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationFileSelect } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { LuFileText } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import useRegistrationStore from "../../../store/useRegistrationStore";
import { VALIDATION_RULES } from "../../../utils/validations";
import { ROUTE_PATHS } from "../../../routes/routePaths";

const DocumentUpload = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formData = useRegistrationStore((state) => state.formData);
  const updateSection = useRegistrationStore((state) => state.updateSection);
  const [fileErrors, setFileErrors] = React.useState({});

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const isSizeValid = VALIDATION_RULES.fileSize(file, 50);

    if (!isSizeValid) {
      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: t('FILE_TOO_LARGE'),
      }));
      return;
    }

    setFileErrors((prev) => ({ ...prev, [fieldName]: null }));
    updateSection('documents', { [fieldName]: file });
  };

  const handleNext = () => {
    if (!formData.documents.driverPicture) {
      setFileErrors((prev) => ({
        ...prev,
        driverPicture: t('DRIVER_PICTURE_REQUIRED'),
      }));
      return;
    }
    navigate(ROUTE_PATHS.ADDITIONAL_INFO);
  };

  const handleSkip = () => {
    navigate(ROUTE_PATHS.ADDITIONAL_INFO);
  };

  return (
    <RegistrationStepWrapper
      title={t('DOCUMENT_UPLOAD_TITLE')}
      currentStep={3}
      icon={<LuFileText />}
    >
      <div className="space-y-4">
        <RegistrationFileSelect
          label={t('DRIVER_PICTURE')}
          placeholder={t('UPLOAD_DRIVER_PICTURE')}
          error={fileErrors.driverPicture}
          fileName={formData.documents.driverPicture?.name}
          onChange={(e) => handleFileChange(e, 'driverPicture')}
        />

        <RegistrationFileSelect
          label={t('NATIONAL_ID_FRONT')}
          placeholder={t('UPLOAD_NATIONAL_ID_FRONT')}
          fileName={formData.documents.idFront?.name}
          onChange={(e) => handleFileChange(e, 'idFront')}
        />

        <RegistrationFileSelect
          label={t('NATIONAL_ID_BACK')}
          placeholder={t('UPLOAD_NATIONAL_ID_BACK')}
          fileName={formData.documents.idBack?.name}
          onChange={(e) => handleFileChange(e, 'idBack')}
        />

        <RegistrationFileSelect
          label={t('DRIVING_LICENSE')}
          placeholder={t('UPLOAD_DRIVING_LICENSE')}
          fileName={formData.documents.license?.name}
          onChange={(e) => handleFileChange(e, 'license')}
        />

        <RegistrationFileSelect
          label={t('VEHICLE_CARD')}
          placeholder={t('UPLOAD_VEHICLE_CARD')}
          fileName={formData.documents.vehicleCard?.name}
          onChange={(e) => handleFileChange(e, 'vehicleCard')}
        />
      </div>
      <StepNavigation onNext={handleNext} onSkip={handleSkip} />
    </RegistrationStepWrapper>
  );
};

export default DocumentUpload;
