import React from 'react';
import { PiMagnifyingGlass, PiFunnel, PiEquals, PiSquaresFour } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

export default function DriverListToolbar({
  searchQuery,
  onSearchChange,
  currentLimit,
  updateCurrentLimit,
  viewMode,
  onViewModeChange,
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Side: Record per page dropdown */}
      <div className="flex items-center">
        <select
          value={currentLimit}
          onChange={(e) => updateCurrentLimit(Number(e.target.value))}
          className="h-11 w-64 rounded-md border border-gray-300 px-3 text-sm text-gray-500 outline-none focus:border-gray-400 bg-white"
        >
          <option value="10">{t('RECORD_PER_PAGE_DEFAULT')}</option>
          <option value="20">20 {t('RECORDS')}</option>
          <option value="50">50 {t('RECORDS')}</option>
        </select>
      </div>

      {/* Right Side: Search, Filter, and View Icons */}
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder={t('SEARCH')}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-64 rounded-md border border-gray-100 bg-[#FAFAFA] pl-4 pr-10 text-sm outline-none focus:border-gray-200"
          />
          <PiMagnifyingGlass
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Filter Button */}
        <button className="flex h-11 items-center gap-2 rounded-md border border-gray-200 px-4 text-sm font-medium text-black hover:bg-gray-50 bg-white">
          <PiFunnel size={18} />
          {t('Filter')}
        </button>

        {/* View Toggle Group */}
        <div className="flex h-11 items-center overflow-hidden rounded-md border border-gray-200 bg-white">
          {/* List View Toggle */}
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`flex h-full w-10 items-center justify-center border-r border-gray-200 transition-colors ${
              viewMode === 'list' ? 'text-black' : 'text-gray-300'
            }`}
          >
            <PiEquals size={22} />
          </button>

          {/* Grid View Toggle */}
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`flex h-full w-10 items-center justify-center transition-colors ${
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
