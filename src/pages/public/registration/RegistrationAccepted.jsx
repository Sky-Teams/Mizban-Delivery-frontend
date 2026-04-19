import React from "react";
import { LuCircleCheck } from "react-icons/lu";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { useNavigate } from "react-router-dom";

const RegistrationAccepted = () => {
  const navigate = useNavigate();

  return (
    <RegistrationStepWrapper
      title="" // Title is handled in the custom content below
      icon={<LuCircleCheck className="text-green-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center text-center">
        {/* Illustration from public/images/accepted.png */}
        <div className="w-full max-w-[280px] mb-6">
          <img
            src="/images/accepted.png"
            alt="Registration Approved"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-xl font-bold text-gray-800">Congratulations!</h2>
          <p className="text-md font-semibold text-gray-700">
            Your account has been successfully approved.
          </p>
        </div>

        {/* Action Buttons from Figma */}
        <div className="flex items-center justify-between gap-4 w-full mt-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Skip for now
          </button>

          <button
            onClick={() => navigate("/settings")} // Or your actual settings path
            className="flex-1 py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 hover:bg-[#e44e34] transition-all"
          >
            Go to account setting
          </button>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationAccepted;
