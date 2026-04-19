import AppRouter from "./routes/appRouter";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

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
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ zIndex: 10000 }}
      />
      <AppRoutes />
    </>
  )
}

export default App; 
