import React from "react";
import RegistrationProgress from "./RegistrationProgress";
import { User } from "lucide-react"; // or your preferred icon library

const RegistrationStepWrapper = ({ title, currentStep, children }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Top User Icon */}
      <div className="bg-white p-4 rounded-full shadow-sm border border-gray-100 mb-[-30px] z-10">
        <User className="text-orange-500 w-8 h-8" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-8 pt-12 shadow-sm">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h2>

        <div className="space-y-5">{children}</div>
      </div>

      {/* Bottom Stepper (Moved outside the card) */}
      <div className="mt-12 w-full max-w-xl">
        <RegistrationProgress currentStep={currentStep} />
      </div>
    </div>
  );
};

export default RegistrationStepWrapper;
