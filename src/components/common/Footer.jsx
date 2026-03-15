import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="font-bold text-gray-900 mb-4">
            {t("Mizban Delivery")}
          </h4>
          <p className="text-sm text-gray-500">
            {t(
              "Connecting businesses with reliable delivery solutions across the region.",
            )}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">{t("Quick Links")}</h4>
          <ul className="text-sm text-gray-500 space-y-2">
            <li>{t("About Us")}</li>
            <li>{t("Privacy Policy")}</li>
            <li>{t("Terms of Service")}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">{t("Project Info")}</h4>
          <p className="text-xs text-gray-400 italic">
            {t("SkyTeams Internship v1.0.0")}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            ©{t("2026 Mizban. All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
