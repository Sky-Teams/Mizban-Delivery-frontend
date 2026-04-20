import React from "react";
import { useTranslation } from "react-i18next";

const RegistrationProgress = ({ currentStep }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t("progress.personal_info") },
    { id: 2, label: t("progress.vehicle_info") },
    { id: 3, label: t("progress.document_submission") },
    { id: 4, label: t("progress.additional_info") },
  ];

  return (
    <div className="flex justify-between relative w-full px-4">
      <div className="absolute top-4 left-0 w-full h-[1.5px] bg-gray-200 -z-0" />

      <div
        className="absolute top-4 left-0 h-[1.5px] bg-green-500 transition-all duration-500 -z-0"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((step) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isDoneOrActive = isCompleted || isActive;

        return (
          <div key={step.id} className="flex flex-col items-center z-10 w-1/4">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300
              ${
                isDoneOrActive
                  ? "bg-white border-green-500 text-gray-800"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              {step.id}
            </div>

            {/* Step Label */}
            <span
              className={`text-[10px] text-center font-medium mt-3 leading-tight transition-colors duration-300 max-w-[70px]
              ${isDoneOrActive ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RegistrationProgress;
