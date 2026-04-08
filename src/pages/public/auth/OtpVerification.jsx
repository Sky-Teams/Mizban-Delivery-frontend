import { useTranslation } from "react-i18next";
import AuthCardLayout from "../../../components/common/AuthCardLayout";

const OtpVerification = ({ email }) => {
  const { t } = useTranslation();
  return (
    <AuthCardLayout
      title={t("checkEmail")}
      description={t("confirmOtpDesc")}
      email={email}
    >
      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-10 h-10 sm:w-12 sm:h-12 border-b-2 border-orange-400 text-center text-xl focus:outline-none"
          />
        ))}
      </div>

      {/* Button */}
      <button className="w-full py-2.5 rounded-md mt-3 text-white text-sm sm:text-base font-medium bg-orange-500 hover:bg-orange-600 transition">
        {t("openEmailApp")}
      </button>

      {/* Bottom Line */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-3  gap-2">
        <p className="text-gray-400 text-[12px]">{t("expireText")}</p>

        <button className="text-gray-700 whitespace-nowrap text-xs sm:text-sm">
          {t("notReceivedCode")}{" "}
          <span className="underline cursor-pointer">{t("resend")}</span>
        </button>
      </div>
    </AuthCardLayout>
  );
};

export default OtpVerification;