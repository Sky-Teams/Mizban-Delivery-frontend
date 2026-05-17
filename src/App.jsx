import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { registerFirebase } from './utils/registerFirebase';
import { notificationListener } from './services/listener/notificationListener';

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const rtlLanguages = ['fa', 'ps'];

    document.documentElement.dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    notificationListener();
    registerFirebase();
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 10000 }} />
      <AppRoutes />
    </>
  );
}

export default App;
