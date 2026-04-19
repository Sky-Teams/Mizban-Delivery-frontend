import React from "react";
import { LuTriangleAlert } from "react-icons/lu"; // Matches the orange warning icon
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { useNavigate } from "react-router-dom";

const RegistrationRejected = () => {
  const navigate = useNavigate();

  return (
    <RegistrationStepWrapper
      title=""
      icon={<LuTriangleAlert className="text-orange-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center">
        {/* Illustration from public/images/rejected.png */}
        <div className="w-full max-w-[280px] mb-6">
          <img
            src="/images/rejected.png"
            alt="Request Rejected"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="text-center space-y-4 mb-8">
          // ... inside RegistrationRejected.jsx
          <h2 className="text-lg font-bold text-gray-800">
            Your request was rejected for the following reasons:
          </h2>
          <ul className="text-sm text-gray-600 font-medium space-y-2 inline-block text-left list-decimal list-inside">
            <li>Invalid document.</li>
            <li>Invalid vehicle information.</li>
          </ul>
        </div>

        {/* Action Buttons matching Figma */}
        <div className="flex items-center justify-between gap-4 w-full mt-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
          >
            Skip for now
          </button>

          <button
            onClick={() => navigate("/registration/personal-info")}
            className="flex-1 py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 hover:bg-[#e44e34] transition-all"
          >
            Go to registration
          </button>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationRejected;
