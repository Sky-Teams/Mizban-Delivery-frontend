import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import AppRouter from "./routes/appRouter";
import { Toaster } from "react-hot-toast";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const rtlLanguages = ["fa", "ps"];

    document.documentElement.dir = rtlLanguages.includes(i18n.language)
      ? "rtl"
      : "ltr";
  }, [i18n.language]);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ zIndex: 9999 }}
      />
      <AppRouter />
    </div>
  );
}

export default App;
