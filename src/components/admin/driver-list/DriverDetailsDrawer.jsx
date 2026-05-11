import React from 'react';
import { PiChatCircleDots, PiCheckCircle, PiStar, PiTrophy, PiX } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import { toLocaleDigits, toLocalePrice } from '../../../utils/numberConverter';

function DetailStat({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-100 p-4 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function ActivityItem({ color, title, meta, icon }) {
  const colors = {
    emerald: 'bg-emerald-100 text-emerald-500',
    orange: 'bg-orange-100 text-orange-500',
    blue: 'bg-blue-100 text-blue-500',
  };

  return (
    <div className="mb-4 flex gap-3">
      <div className={`flex h-7 w-7 items-center justify-center rounded-full ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-400">{meta}</p>
      </div>
    </div>
  );
}

export default function DriverDetailsDrawer({ driver, onClose }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  if (!driver) return null;

  // direct values (no helpers)
  const rating = driver?.rating ?? 0;
  const deliveries = driver?.deliveries ?? 0;
  const level = driver?.level ?? driver?.maxPackages ?? 0;
  const rank = driver?.rank ?? 'N/A';
  const memberSince = driver?.memberSince || 'N/A';
  const image = driver?.profilePicture || '';
  const name = driver?.fullName || '';
  const status = driver?.status || 'N/A';

  // derived logic stays inline (this is OK)
  const initials = driver?.fullName
    ? driver.fullName
        .trim()
        .split(' ')
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join('')
    : '';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/10" onClick={onClose} />

      <aside className="relative h-full w-full max-w-md overflow-auto bg-white p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-base font-semibold">{t('DRIVER_DETAILS')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label={t('CLOSE')}
          >
            <PiX size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          {image ? (
            <img
              src={image}
              alt={name || 'Driver profile'}
              className="mb-4 h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-2xl font-semibold text-orange-600">
              {initials}
            </div>
          )}

          <h3 className="text-lg font-semibold">{name || t('UNKOWN_DRIVER')}</h3>

          <p className="text-xs text-gray-400">
            {t('MEMEBER_SINCE')} {memberSince}
          </p>

          <div className="mt-3 flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
            <PiTrophy size={12} />
            {driver.partnerTier || t('GOLD_PARTNER')}
          </div>

          <div className="mt-8 grid w-full grid-cols-3 gap-4">
            <DetailStat label={t('RATING')} value={toLocalePrice(rating, lng)} />
            <DetailStat label={t('RANK')} value={rank} />
            <DetailStat label={t('LEVEL')} value={toLocaleDigits(level, lng)} />
          </div>

          <div className="mt-8 w-full">
            <h4 className="mb-4 text-xs uppercase text-gray-400">{t('RECENT_ACTIVITY')}</h4>

            <ActivityItem
              color="emerald"
              title={t('DELIVERY_COMPLETED')}
              meta={`${t('TOTAL_DELIVERIES')}: ${toLocaleDigits(deliveries, lng)}`}
              icon={<PiCheckCircle size={14} />}
            />
            <ActivityItem
              color="orange"
              title={t('5_START_FEEDBACK')}
              meta={`${t('CURRENT_RATING')}: ${toLocalePrice(rating, lng)}`}
              icon={<PiStar size={14} />}
            />
            <ActivityItem
              color="blue"
              title={t('Status')}
              meta={status === 'N/A' ? status : t(status)}
              icon={<PiTrophy size={14} />}
            />
          </div>

          <div className="mt-8 w-full rounded-2xl bg-[#0F172A] p-5 text-white">
            <div className="mb-2 flex justify-between text-xs">
              <span>{t('NEXT_REWAERD')}</span>
              <span className="text-orange-400">
                {toLocaleDigits(Math.min(deliveries, 100), lng)}%
              </span>
            </div>

            <div className="mb-3 h-2 w-full rounded-full bg-gray-700">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${Math.min(deliveries, 100)}%` }}
              />
            </div>

            <p className="text-xs text-gray-300">
              {t('COMPLETE_DELIVERIES_TO_UNLOCK_BOUNS')}
            </p>
          </div>

          <div className="mt-8 w-full space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold hover:bg-gray-50"
            >
              <PiChatCircleDots size={16} />
              {t('SEND_MESSAGE')}
            </button>

            <button
              type="button"
              className="w-full rounded-xl py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
            >
              {t('SUSPEND_ACCOUNT')}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
