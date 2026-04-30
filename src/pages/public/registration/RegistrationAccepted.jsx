import React from "react";
import { LuCircleCheck } from "react-icons/lu";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import acceptedImage from "../../../assets/png/accepted.png";
import { ROUTE_PATHS } from "../../../routes/routePaths";

const RegistrationAccepted = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <RegistrationStepWrapper
      title="" // Title is handled in the custom content below
      icon={<LuCircleCheck className="text-green-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-full max-w-[280px] mb-6">
          <img
            src={acceptedImage}
            alt={t("REGISTRATION_APPROVED")}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            {t("CONGRATULATIONS")}
          </h2>
          <p className="text-md font-semibold text-gray-700">
            {t("ACCOUNT_APPROVED")}
          </p>
        </div>

        {/* Action Buttons from Figma */}
        <div className="flex items-center justify-between gap-4 w-full mt-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
          >
            {t("NAVIGATION_SKIP")}
          </button>

          <button
            onClick={() => navigate(ROUTE_PATHS.SETTINGS)}
            className="flex-1 py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 hover:bg-[#e44e34] transition-all"
          >
            {t("GO_TO_ACCOUNT_SETTINGS")}
          </button>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationAccepted;
