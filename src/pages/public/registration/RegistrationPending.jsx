import React from "react";
import { LuClock } from "react-icons/lu";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { useTranslation } from "react-i18next";

const RegistrationPending = () => {
  const { t } = useTranslation();

  return (
    <RegistrationStepWrapper
      title={t("REGISTRATION_PENDING_TITLE")}
      icon={<LuClock className="text-orange-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center text-center">
        {/* Render the illustration from the public folder */}
        <div className="w-full max-w-[280px] mb-8">
          <img
            src="/images/pending.png"
            alt={t("REGISTRATION_PENDING_IMG_ALT")}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1A202C] leading-snug">
            {t("REGISTRATION_PENDING_HEADING_LINE1")} <br />
            {t("REGISTRATION_PENDING_HEADING_LINE2")}
          </h2>

          <p className="text-sm text-gray-500 font-medium">
            {t("REGISTRATION_PENDING_DESCRIPTION_LINE1")} <br />
            {t("REGISTRATION_PENDING_DESCRIPTION_LINE2")}
          </p>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationPending;
