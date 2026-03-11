import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fa from "./locales/fa.json";
import ps from "./locales/ps.json";

const resources = {
  en: { translation: en },
  fa: { translation: fa },
  ps: { translation: ps },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fa",
    fallbackLng: "fa",
    supportedLngs: ["en", "fa", "ps"],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
