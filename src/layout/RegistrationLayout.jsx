import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/common/Sidebar';

export default function RegistrationLayout() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const isRTL = i18n.language === 'fa' || i18n.language === 'ps';

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-6 min-h-screen overflow-x-hidden flex justify-center">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
