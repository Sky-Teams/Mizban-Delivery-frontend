import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toLocaleDigits } from '../../../utils/numberConverter';

export default function DriverStats({ drivers, lng, activeTab = 'all', onTabChange }) {
  const { t } = useTranslation();

  const stats = useMemo(
    () => ({
      total: drivers.length,
      available: 0,
      unavailable: 0,
      suspending: 0,
    }),
    [drivers],
  );

  const tabs = [
    { label: t('ALL_DRIVER'), count: stats.total, key: 'all' },
    { label: t('AVAILABLE_DRIVER'), count: stats.available, key: 'available' },
    { label: t('UNAVAILABLE_DRIVER'), count: stats.unavailable, key: 'unavailable' },
    { label: t('SUSPENDING_DRIVER'), count: stats.suspending, key: 'suspending' },
  ];

  return (
    <div className="mb-6 w-full border-b border-gray-200">
      <div className="flex w-full justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange?.(tab.key)}
            className={`relative flex-1 pb-3 text-center text-lg font-medium transition-colors ${
              activeTab === tab.key ? 'text-[#FF7F5C]' : 'text-gray-600 hover:text-black'
            }`}
          >
            {tab.label}({toLocaleDigits(tab.count, lng)})
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#FF7F5C]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
