import React from "react";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../../utils/IsRTLDirection";

const RegistrationProgress = ({ currentStep }) => {
  const { t } = useTranslation();
  const rtl = isRTL();

  const steps = [
    { id: 1, label: t("PROGRESS_PERSONAL_INFO") },
    { id: 2, label: t("PROGRESS_VEHICLE_INFO") },
    { id: 3, label: t("PROGRESS_DOCUMENT_SUBMISSION") },
    { id: 4, label: t("PROGRESS_ADDITIONAL_INFO") },
  ];

  return (
    <div className="relative w-full px-8 py-4">
      {/* Background Gray Line */}
      <div className="absolute top-8 left-12 right-12 h-[2px] bg-gray-100 -z-0 transform -translate-y-1/2" />

      <div className="flex justify-between relative z-10">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isDoneOrActive = isCompleted || isActive;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1 relative"
            >
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 w-full h-[2px] -z-10 transition-all duration-500 ease-in-out ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                  style={{
                    [rtl ? "right" : "left"]: "50%",
                  }}
                />
              )}

              {/* Step Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                  isDoneOrActive
                    ? "bg-white border-green-500 text-gray-800"
                    : "bg-white border-gray-200 text-gray-300"
                }`}
              >
                {step.id}
              </div>

              {/* Step Label */}
              <span
                className={`text-[12px] text-center font-medium mt-3 leading-tight transition-colors duration-300 max-w-[85px] ${
                  isDoneOrActive ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationProgress;
