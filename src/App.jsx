import AppRouter from './routes/appRouter';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import registerSocketAndFirebase from './utils/registerSocketAndFirebase';

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const rtlLanguages = ['fa', 'ps'];

    document.documentElement.dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    registerSocketAndFirebase();
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 10000 }} />
      <AppRoutes />
    </>
  );
}

export default App;
