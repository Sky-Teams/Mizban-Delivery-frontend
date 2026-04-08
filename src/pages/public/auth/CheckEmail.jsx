import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthCardLayout from "../../../components/common/AuthCardLayout";

const CheckEmail = ({ email }) => {
  const { t } = useTranslation();
  return (
    <AuthCardLayout
      title={t("checkEmail")}
      description={t("confirmLinkDesc")}
      email={email}
    >
      {/* Button */}
      <button className="w-full py-2.5 rounded-md mt-3 text-white text-sm sm:text-base font-medium bg-orange-500 hover:bg-orange-600 transition cursor-pointer">
        {t("openEmailApp")}
      </button>

      {/* Bottom Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-1 text-xs sm:text-sm gap-2">
        <button className="text-gray-700">
          {t("notReceivedLink")}{" "}
          <span className="underline cursor-pointer">{t("resend")}</span>
        </button>

        <Link to="/otp-verification" className="text-orange-500 font-medium">
          {t("manualOtp")}
        </Link>
      </div>

      {/* Timer */}
      <p className="text-[10px] sm:text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center">{t("expireText")}</p>
    </AuthCardLayout>
  );
};

export default CheckEmail;