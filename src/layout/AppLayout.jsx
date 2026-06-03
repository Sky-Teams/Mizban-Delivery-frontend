import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useState, useEffect } from 'react';
import i18next from 'i18next';

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState(i18next.language);

  useEffect(() => {
    const handler = (lng) => setLang(lng);

    i18next.on('languageChanged', handler);
    return () => i18next.off('languageChanged', handler);
  }, []);

  const isRTL = lang === 'fa' || lang === 'ps';

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main
          className={`flex-1 p-6 transition-all duration-300
          ${isRTL ? (isOpen ? 'md:mr-64' : 'md:mr-20') : isOpen ? 'md:ml-64' : 'md:ml-20'}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
