import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInputWithIcon } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import { LuInfo, LuPhone, LuUser } from "react-icons/lu";

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const { formData, updateSection, submitRegistration } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection("additionalInfo", { [name]: value });
  };

  const handleFinish = async () => {
    if (isSubmitting) return; // Guard clause: Prevent double execution

    setIsSubmitting(true);
    const isSuccess = await submitRegistration();
    setIsSubmitting(false);

    if (isSuccess) {
      navigate("/registration/pending");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <RegistrationStepWrapper
      title="Additional Information"
      currentStep={4}
      icon={<LuInfo className="text-orange-500 w-8 h-8" />}
    >
      <p className="text-center text-xs text-gray-500 mb-2">
        This section is optional you can fill information or skip, but we
        recommend to fill it.
      </p>

      <div className="space-y-5">
        <RegistrationInputWithIcon
          label="Emergency Contact Number"
          name="emergencyContact"
          placeholder="Enter emergency contact phone number"
          icon={LuPhone}
          value={formData.additionalInfo.emergencyContact || ""}
          onChange={handleChange}
        />

        <RegistrationInputWithIcon
          label="Relationship"
          name="relationship"
          placeholder="Type the relationship. (brother, father...)"
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
