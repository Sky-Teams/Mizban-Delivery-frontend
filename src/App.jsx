import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { notificationListener } from './services/listener/notificationListener';
import { registerServiceWorker } from './utils/registerServiceWorker';
import { firebaseListener } from './services/listener/firebaseListener';
import { initSocket } from './config/socket.js';
import useAuthStore from './store/useAuthStore.js';

function App() {
  const { i18n } = useTranslation();
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const accessToken = useAuthStore.getState().accessToken;
  const refreshStarted = useRef(false);

  useEffect(() => {
    const rtlLanguages = ['fa', 'ps'];

    document.documentElement.dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    notificationListener();
    registerServiceWorker();
    firebaseListener();
  }, []);

  useEffect(() => {
    if (refreshStarted.current) return;

    refreshStarted.current = true;
    const restoreSession = async () => {
      if (!accessToken) {
        const response = await refreshToken();
        if (!response) {
          return;
        }
      }

      initSocket();
    };

    restoreSession();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 10000 }} />
      <AppRoutes />
    </>
  );
}

export default App;
