import React from "react";

const steps = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Vehicle Information" },
  { id: 3, label: "Document submission" },
  { id: 4, label: "Additional Information" },
];

const RegistrationProgress = ({ currentStep }) => {
  return (
    <div className="flex justify-between relative">
      {/* Connecting Line */}
      <div className="absolute top-4 left-0 w-full h-[1px] bg-gray-200 -z-0" />

      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center z-10 w-1/4">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium mb-2 transition-colors
            ${
              currentStep === step.id
                ? "bg-white border-gray-800 text-gray-800 shadow-sm"
                : "bg-white border-gray-200 text-gray-400"
            }`}
          >
            {step.id}
          </div>
          <span
            className={`text-[10px] text-center font-medium leading-tight px-1
            ${currentStep === step.id ? "text-gray-800" : "text-gray-400"}`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RegistrationProgress;
