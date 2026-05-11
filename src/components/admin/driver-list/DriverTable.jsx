import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { toLocaleDigits } from '../../../utils/numberConverter';
import { isRTL } from '../../../utils/IsRTLDirection';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import DriverStatusBadge from './DriverStatusBadge';
import DriverRowActions from '../driver-list/DriverRowActions';

// Integrated internal components for clean parent-child relationship
function DriverTableState({ message, isError = false }) {
  return (
    <div
      className={`px-4 py-10 text-center text-lg ${
        isError ? 'bg-red-50 text-red-500' : 'bg-white text-gray-500'
      }`}
    >
      {message}
    </div>
  );
}

export default function DriverTable({
  drivers,
  openMenuId,
  menuPosition,
  menuRef,
  onRowClick,
  onToggleMenu,
  onEditDriver,
  onDeleteDriver,
}) {
  const { t } = useTranslation();
  const lng = i18n.language;
  const direction = isRTL() ? 'rtl' : 'ltr';
  const textAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const isLoading = useDriverStore((state) => state.isLoading);
  const error = useDriverStore((state) => state.error);
  const errorMessage = error?.message;

  if (errorMessage) {
    return <DriverTableState message={t(errorMessage, { defaultValue: errorMessage })} isError />;
  }

  if (isLoading) {
    return <DriverTableState message={t('Loading...')} />;
  }

  return (
    <div className="w-full overflow-x-auto bg-white">
      {drivers.length === 0 ? (
        <DriverTableState message={t('No drivers found')} />
      ) : (
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            {/* 1 & 2: Background #FF9D85 and Text Black | 4: Text Bigger (text-base) */}
            <tr className="bg-[#FF9D85] text-base font-bold text-black">
              <th className={`px-6 py-5 ${textAlign}`}>{t('ID')}</th>
              <th className={`px-6 py-5 ${textAlign}`}>{t('Name')}</th>
              <th className={`px-6 py-5 ${textAlign}`}>{t('Contact')}</th>
              <th className={`px-6 py-5 ${textAlign}`}>{t('Address')}</th>
              <th className={`px-6 py-5 ${textAlign}`}>{t('Status')}</th>
              <th className="px-6 py-5 text-center">{t('Actions')}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {drivers.map((driver) => {
              const image = driver?.profilePicture || '';
              const name = driver?.fullName || '';
              const phone = driver?.phone || '07986 432345';
              const address =
                driver?.address ||
                'Qale mosa, 7 distract, first street, second road, block5, tower 3';

              const initials = name
                ? name
                    .trim()
                    .split(' ')
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join('')
                : '';

              return (
                <tr
                  key={driver.id}
                  onClick={() => onRowClick(driver)}
                  className="cursor-pointer transition hover:bg-gray-50"
                >
                  {/* ID Column */}
                  <td className="px-6 py-5 text-base font-medium text-black">
                    #{toLocaleDigits(driver.id || '00001', lng)}
                  </td>

                  {/* Name Column */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF1EC] text-xs font-semibold text-[#F25C2A]">
                          {initials}
                        </div>
                      )}
                      <span className="text-base font-semibold text-black">
                        {name || t('Unknown')}
                      </span>
                    </div>
                  </td>

                  {/* Contact Column */}
                  <td className="px-6 py-5 text-base text-black">
                    <div className="flex flex-col">
                      <span>{toLocaleDigits(phone, lng)}</span>
                      <span>{toLocaleDigits(phone, lng)}</span>
                    </div>
                  </td>

                  {/* Address Column */}
                  <td className="px-6 py-5 text-base text-black max-w-[280px]">
                    <p className="leading-snug">{address}</p>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-5">
                    <DriverStatusBadge status={driver.status} />
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
                    <DriverRowActions
                      driverId={driver.id}
                      openMenuId={openMenuId}
                      menuPosition={menuPosition}
                      menuRef={menuRef}
                      onToggleMenu={onToggleMenu}
                      onEditDriver={onEditDriver}
                      onDeleteDriver={onDeleteDriver}
                      /* Ensure no 'isVertical' prop is passed here */
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
