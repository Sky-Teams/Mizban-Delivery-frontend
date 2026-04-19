import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationFileSelect } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { LuFileText } from "react-icons/lu";

const DocumentUpload = () => {
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
        [fieldName]: "File is too large (max 50 KB)",
      }));
      return;
    }

    // 2. Clear errors and update context if valid
    setFileErrors((prev) => ({ ...prev, [fieldName]: null }));
    updateSection("documents", { [fieldName]: file });
  };

  // Triggered by "Save and continue" - VALIDATES
  const handleNext = () => {
    if (!formData.documents.driverPicture) {
      setFileErrors((prev) => ({
        ...prev,
        driverPicture: "Driver photo is required",
      }));
      return;
    }
    navigate("/registration/additional-info");
  };

  // Triggered by "Skip for now" - NO VALIDATION
  const handleSkip = () => {
    navigate("/registration/additional-info");
  };

  return (
    <RegistrationStepWrapper
      title="Required Document"
      currentStep={3}
      icon={<LuFileText />}
    >
      <div className="space-y-4">
        <RegistrationFileSelect
          label="Driver Picture"
          placeholder="Upload driver photo (max 50 KB)"
          error={fileErrors.driverPicture}
          fileName={formData.documents.driverPicture?.name}
          onChange={(e) => handleFileChange(e, "driverPicture")}
        />

        <RegistrationFileSelect
          label="National ID Card (Front)"
          placeholder="Upload a picture from front of your national id card"
          fileName={formData.documents.idFront?.name}
          onChange={(e) => handleFileChange(e, "idFront")}
        />

        <RegistrationFileSelect
          label="National ID Card (Back)"
          placeholder="Upload a picture from back of your national id card"
          fileName={formData.documents.idBack?.name}
          onChange={(e) => handleFileChange(e, "idBack")}
        />

        <RegistrationFileSelect
          label="Driving License"
          placeholder="Upload your driving license"
          fileName={formData.documents.license?.name}
          onChange={(e) => handleFileChange(e, "license")}
        />

        <RegistrationFileSelect
          label="Vehicle Card"
          placeholder="Upload your vehicle card"
          fileName={formData.documents.vehicleCard?.name}
          onChange={(e) => handleFileChange(e, "vehicleCard")}
        />
      </div>
      <StepNavigation onNext={handleNext} onSkip={handleSkip} />
    </RegistrationStepWrapper>
  );
};

export default DocumentUpload;
