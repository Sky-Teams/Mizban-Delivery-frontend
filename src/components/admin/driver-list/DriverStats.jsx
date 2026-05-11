import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toLocaleDigits } from '../../../utils/numberConverter';
import { DRIVER_STATUS } from '../../../utils/types';

export default function DriverStats({ drivers, lng }) {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    return {
      total: drivers.length,
      available: drivers.filter((d) => d.status === DRIVER_STATUS.AVAILABLE).length,
      unavailable: drivers.filter((d) => d.status === DRIVER_STATUS.UNAVAILABLE).length,
      suspending: drivers.filter((d) => d.status === DRIVER_STATUS.SUSPENDING).length,
    };
  }, [drivers]);

  // Tab data following Figma labels
  const tabs = [
    { label: t('All Driver'), count: stats.total, key: 'all', active: true },
    { label: t('Available Driver'), count: stats.available, key: 'available' },
    { label: t('Unavailable Driver'), count: stats.unavailable, key: 'unavailable' },
    { label: t('Suspending Driver'), count: stats.suspending, key: 'suspending' },
  ];

  return (
    <div className="mb-6 w-full border-b border-gray-200">
      <div className="flex w-full justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`relative flex-1 pb-3 text-center text-lg font-medium transition-colors ${
              tab.active ? 'text-[#FF7F5C]' : 'text-gray-600 hover:text-black'
            }`}
          >
            {tab.label}({toLocaleDigits(tab.count, lng)}){/* The active underline (orange) */}
            {tab.active && <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#FF7F5C]" />}
          </button>
        ))}
      </div>
    </div>
  );
}
