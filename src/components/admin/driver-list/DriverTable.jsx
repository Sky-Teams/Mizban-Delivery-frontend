import React from 'react';
import { PiStarFill } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { toLocaleDigits, toLocalePrice } from '../../../utils/numberConverter';
import { isRTL } from '../../../utils/IsRTLDirection';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import DriverStatusBadge from './DriverStatusBadge';
import DriverRowActions from '../driver-list/DriverRowActions';

function TableHead({ direction }) {
  const { t } = useTranslation();
  const textAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const deliveriesAlign = direction === 'rtl' ? 'text-start' : 'text-center';
  const alignTitleText = `pb-4 ${textAlign}`;

  return (
    <thead>
      <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
        <th className={alignTitleText}>{t('DRIVER')}</th>
        <th className={alignTitleText}>{t('STATUS')}</th>
        <th className={alignTitleText}>{t('VEHICLE')}</th>
        <th className={alignTitleText}>{t('RATING')}</th>
        <th className={alignTitleText}>{t('LAST_ACTIVE')}</th>
        <th className={`pb-4 ${deliveriesAlign}`}>{t('NUMBER_OF_DELIVERIES')}</th>
        <th className="pb-4" />
      </tr>
    </thead>
  );
}

function DriverTableState({ message, isError = false }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-10 text-center text-sm ${
        isError ? 'border-red-100 bg-red-50 text-red-500' : 'border-gray-100 bg-white text-gray-500'
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
  const isLoading = useDriverStore((state) => state.isLoading);
  const error = useDriverStore((state) => state.error);
  const errorMessage = error?.message;

  if (errorMessage) {
    return <DriverTableState message={t(errorMessage, { defaultValue: errorMessage })} isError />;
  }

  if (isLoading) {
    return <DriverTableState message={t('LOADING')} />;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-6">
      <h2 className="mb-6 text-base font-semibold">{t('FLEET_DIRECTORY')}</h2>

      {drivers.length === 0 ? (
        <DriverTableState message={t('NO_DRIVERS_FOUND')} />
      ) : (
        <table className="w-full min-w-[900px]">
          <TableHead direction={direction} />

          <tbody className="divide-y divide-gray-100">
            {drivers.map((driver) => {
              const rating = driver?.rating ?? 0;
              const deliveries = driver?.deliveries ?? 0;

              const image = driver?.profilePicture || '';
              const name = driver?.fullName || '';
              const contact = driver?.phone || '';
              const vehicle = t(driver?.vehicleType.toUpperCase()) || 'N/A';
              const lastActive = driver?.lastActive || 'N/A';

              const initials = driver?.fullName
                ? driver.fullName
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
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      {image ? (
                        <img
                          src={image}
                          alt={name || t('DRIVER_PROFILE')}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
                          {initials}
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-semibold">{name || t('UNKOWN_DRIVER')}</p>

                        <p className="text-xs text-gray-400">
                          {t('ID')}: {toLocaleDigits(driver.id, lng)}
                        </p>

                        <p className="text-xs text-gray-400">{toLocaleDigits(contact, lng)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5">
                    <DriverStatusBadge status={driver.status} />
                  </td>

                  <td className="py-5 text-sm text-gray-500">{vehicle}</td>

                  <td className="py-5">
                    <div className="flex items-center gap-1">
                      <PiStarFill size={14} className="text-yellow-400" />
                      <span className="text-sm font-semibold">{toLocalePrice(rating, lng)}</span>
                    </div>
                  </td>

                  <td className="py-5 text-sm text-gray-500">{lastActive}</td>

                  <td className="py-5 text-center text-sm font-semibold">
                    {toLocaleDigits(deliveries, lng)}
                  </td>

                  <td className="py-5">
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
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
