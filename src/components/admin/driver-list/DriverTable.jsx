import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  PiPhone,
  PiEnvelopeSimple,
  PiMapPin,
  PiClock,
  PiPackage,
  PiCheckSquare,
  PiShieldCheck,
  PiPencilSimple,
  PiTrash,
} from 'react-icons/pi';
import i18n from '../../../i18n';
import { toLocaleDigits } from '../../../utils/numberConverter';
import { isRTL } from '../../../utils/IsRTLDirection';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import DriverStatusBadge from './DriverStatusBadge';
import DriverRowActions from '../driver-list/DriverRowActions';

function DriverTableState({ message, isError = false }) {
  return (
    <div
      className={`px-4 py-10 text-center text-lg ${isError ? 'bg-red-50 text-red-500' : 'bg-white text-gray-500'}`}
    >
      {message}
    </div>
  );
}

// New Grid Card Component based on Figma
function DriverGridCard({ driver, lng, onRowClick, onEdit, onDelete }) {
  const { t } = useTranslation();
  const name = driver?.fullName || t('UNKNOWN');
  const initials = name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

  return (
    <div
      onClick={() => onRowClick(driver)}
      className="cursor-pointer rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      {/* Top Actions */}
      <div className="mb-2 flex justify-end gap-3 text-gray-400">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(driver.id);
          }}
          className="hover:text-black"
        >
          <PiPencilSimple size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e, driver.id);
          }}
          className="hover:text-red-500"
        >
          <PiTrash size={20} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="mb-4 flex items-center gap-3">
        {driver?.profilePicture ? (
          <img
            src={driver.profilePicture}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1EC] text-sm font-semibold text-[#F25C2A]">
            {initials}
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-black">{name}</h3>
          <p className="text-xs text-gray-400">ID: #{toLocaleDigits(driver.id || '00001', lng)}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-2 border-y border-gray-50 py-4 text-sm text-black">
        <div className="flex items-start gap-2">
          <PiPhone size={18} className="mt-0.5 text-gray-400" />
          <span>
            {toLocaleDigits(driver?.phone || '07986 432345', lng)},{' '}
            {toLocaleDigits(driver?.phone2 || '07986 432345', lng)}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <PiEnvelopeSimple size={18} className="mt-0.5 text-gray-400" />
          <span className="truncate">{driver?.email || 'reshad@gmail.com'}</span>
        </div>
        <div className="flex items-start gap-2">
          <PiMapPin size={18} className="mt-0.5 text-gray-400" />
          <p className="leading-snug">
            {driver?.address || 'Qale mosa, 7 distract, first street...'}
          </p>
        </div>
      </div>

      {/* Activities Summary */}
      <div className="mt-4">
        <h4 className="mb-3 text-sm font-bold text-black">{t('ACTIVITIES_SUMMARY')}</h4>
        <div className="space-y-3 text-xs font-medium text-black">
          <div className="flex items-center gap-2">
            <PiClock size={16} />
            <span>
              {t('ACCOUNT_ACTIVATION_DATE')}: {toLocaleDigits('2/12/2025', lng)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PiPackage size={16} />
            <span>
              {t('TOTAL_ORDER')}: {toLocaleDigits(driver?.totalOrders || 20, lng)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PiCheckSquare size={16} />
            <span>
              {t('COMPLETED_ORDER')}: {toLocaleDigits(driver?.completedOrders || 18, lng)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PiShieldCheck size={16} />
            <span>
              {t('GUARANTEE_MONEY')}: {toLocaleDigits(2000, lng)} AFG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DriverTable({
  drivers,
  viewMode = 'list',
  openMenuId,
  menuPosition,
  menuRef,
  onRowClick,
  onToggleMenu,
  onDeleteDriver,
  onEditDriver,
}) {
  const { t } = useTranslation();
  const lng = i18n.language;
  const direction = isRTL() ? 'rtl' : 'ltr';
  const textAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const isLoading = useDriverStore((state) => state.isLoading);
  const error = useDriverStore((state) => state.error);
  const errorMessage = error?.message;

  if (errorMessage) {
    return <DriverTableState message={t(errorMessage)} isError />;
  }

  if (isLoading) {
    return <DriverTableState message={t('Loading...')} />;
  }

  if (drivers.length === 0) {
    return <DriverTableState message={t('No drivers found')} />;
  }

  // Grid View Render
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <DriverGridCard
            key={driver.id}
            driver={driver}
            lng={lng}
            onRowClick={onRowClick}
            onEdit={onEditDriver}
            onDelete={onDeleteDriver}
          />
        ))}
      </div>
    );
  }

  // List View Render (Original Table)
  return (
    <div className="w-full overflow-x-auto bg-white">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="bg-[#FF9D85] text-base font-bold text-black">
            <th className={`px-6 py-5 ${textAlign}`}>{t('ID')}</th>
            <th className={`px-6 py-5 ${textAlign}`}>{t('Name')}</th>
            <th className={`px-6 py-5 ${textAlign}`}>{t('CONTACT')}</th>
            <th className={`px-6 py-5 ${textAlign}`}>{t('Address')}</th>
            <th className={`px-6 py-5 ${textAlign}`}>{t('Status')}</th>
            <th className="px-6 py-5 text-center">{t('Actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {drivers.map((driver) => (
            <tr
              key={driver.id}
              onClick={() => onRowClick(driver)}
              className="cursor-pointer transition hover:bg-gray-50"
            >
              <td className="px-6 py-5 text-base font-medium text-black">
                #{toLocaleDigits(driver.id || '00001', lng)}
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  {driver.profilePicture ? (
                    <img
                      src={driver.profilePicture}
                      className="h-10 w-10 rounded-full object-cover"
                      alt={driver.fullName}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF1EC] text-xs font-semibold text-[#F25C2A]">
                      {driver.fullName
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}
                  <span className="text-base font-semibold text-black">{driver.fullName}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-base text-black">
                <div className="flex flex-col">
                  <span>{toLocaleDigits(driver.phone, lng)}</span>
                  <span>{toLocaleDigits(driver.phone, lng)}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-base text-black max-w-[280px]">
                <p className="leading-snug">{driver.address}</p>
              </td>
              <td className="px-6 py-5">
                <DriverStatusBadge status={driver.status} />
              </td>
              <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                <DriverRowActions
                  driverId={driver.id}
                  openMenuId={openMenuId}
                  menuPosition={menuPosition}
                  menuRef={menuRef}
                  onToggleMenu={onToggleMenu}
                  onEditDriver={onEditDriver}
                  onDeleteDriver={onDeleteDriver}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
