import React from "react";
import { LuClock } from "react-icons/lu";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { useTranslation } from "react-i18next";

const RegistrationPending = () => {
  const { t } = useTranslation();

  return (
    <RegistrationStepWrapper
      title={t("registrationPending.title")}
      icon={<LuClock className="text-orange-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center text-center">
        {/* Render the illustration from the public folder */}
        <div className="w-full max-w-[280px] mb-8">
          <img
            src="/images/pending.png"
            alt={t("registrationPending.img_alt")}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1A202C] leading-snug">
            {t("registrationPending.heading_line1")} <br />
            {t("registrationPending.heading_line2")}
          </h2>

          <p className="text-sm text-gray-500 font-medium">
            {t("registrationPending.description_line1")} <br />
            {t("registrationPending.description_line2")}
          </p>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationPending;
