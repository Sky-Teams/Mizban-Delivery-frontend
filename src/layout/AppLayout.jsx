import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useState } from 'react';
import { isRTL } from '../utils/IsRTLDirection';

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const rtl = isRTL();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main
          className={`flex-1 p-6 transition-all duration-300
          ${rtl ? (isOpen ? 'md:mr-64' : 'md:mr-20') : isOpen ? 'md:ml-64' : 'md:ml-20'}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
