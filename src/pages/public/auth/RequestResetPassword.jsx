import { useTranslation } from "react-i18next";
import { HiOutlineMail } from "react-icons/hi";
import AuthCardLayout from "../../../components/common/AuthCardLayout";

const RequestResetPassword = () => {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "fa" || i18n.language === "ps";

  const iconPosition = isRTL ? "left-3" : "right-3";
  const inputPadding = isRTL ? "pl-10 pr-4 text-right" : "pr-10 pl-4 text-left";
  const textAlign = isRTL ? "text-right" : "text-left";

  return (
    <AuthCardLayout
      title={t("requestResetPassword")}
      description={t("resetPasswordDesc")}
      email={false}
      backLink="/login"
      backText={t("backToLogin")}
    >
      {/* Email */}
      <div className="mb-5">
        <label className={`block text-sm font-medium mb-2 text-gray-700 ${textAlign}`}>
          {t("email")}
        </label>

        <div className="relative">
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className={`w-full border border-gray-300 rounded-md py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 ${inputPadding}`}
          />

          <HiOutlineMail
            className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconPosition}`}
            size={18}
          />
        </div>
      </div>

      {/* Button */}
      <button className="w-full py-2.5 rounded-md text-white text-sm font-medium bg-orange-500 hover:bg-orange-600 transition">
        {t("sendInstruction")}
      </button>
    </AuthCardLayout>
  );
};

export default RequestResetPassword;