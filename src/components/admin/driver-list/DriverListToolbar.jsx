import React from 'react';
import { PiMagnifyingGlass, PiFunnel, PiEquals, PiSquaresFour } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { toLocaleDigits } from '../../../utils/numberConverter';

export default function DriverListToolbar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) {
  const { t, i18n } = useTranslation();
  const currentLimit = useDriverStore((state) => state.currentLimit);
  const updateCurrentLimit = useDriverStore((state) => state.updateCurrentLimit);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Side: Record per page dropdown */}
      <div className="flex w-full items-center md:w-auto">
        <select
          value={currentLimit}
          onChange={(e) => updateCurrentLimit(Number(e.target.value))}
          className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 outline-none focus:border-gray-400 md:w-64"
        >
          <option value="10">{t('RECORD_PER_PAGE_DEFAULT')}</option>
          <option value="20">
            {toLocaleDigits(20, i18n.language)} {t('RECORDS')}
          </option>
          <option value="50">
            {toLocaleDigits(50, i18n.language)} {t('RECORDS')}
          </option>
        </select>
      </div>

      {/* Right Side: Search, Filter, and View Icons */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        {/* Search Input */}
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder={t('SEARCH')}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-md border border-gray-100 bg-[#FAFAFA] pl-4 pr-10 text-sm outline-none focus:border-gray-200 sm:w-64"
          />
          <PiMagnifyingGlass
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Filter Button */}
        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-black hover:bg-gray-50 sm:w-auto">
          <PiFunnel size={18} />
          {t('FILTER')}
        </button>

        {/* View Toggle Group */}
        <div className="flex h-11 items-center self-end overflow-hidden rounded-md border border-gray-200 bg-white sm:self-auto">
          {/* List View Toggle */}
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`flex h-full w-10 items-center justify-center border-r border-gray-200 transition-colors cursor-pointer ${
              viewMode === 'list' ? 'text-black' : 'text-gray-300'
            }`}
          >
            <PiEquals size={22} />
          </button>

          {/* Grid View Toggle */}
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`flex h-full w-10 items-center justify-center transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'text-black' : 'text-gray-300'
            }`}
          >
            <PiSquaresFour size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
