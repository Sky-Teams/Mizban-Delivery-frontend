import React from "react";
import { LuClock } from "react-icons/lu";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";

const RegistrationPending = () => {
  return (
    <RegistrationStepWrapper
      title="Under review" // Added the title seen in your latest screenshot
      icon={<LuClock className="text-orange-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center text-center">
        {/* Render the illustration from the public folder */}
        <div className="w-full max-w-[280px] mb-8">
          <img
            src="/images/pending.png" // Absolute path to your public/images folder
            alt="Registration Under Review"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1A202C] leading-snug">
            Thank you for your interest in registering as a <br />
            driver with Mizban Delivery Services.
          </h2>

          <p className="text-sm text-gray-500 font-medium">
            Our team is checking your request and your <br />
            account will be activated soon!
          </p>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationPending;
