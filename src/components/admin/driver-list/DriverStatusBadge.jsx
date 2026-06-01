import React from 'react';
import { useTranslation } from 'react-i18next';
import { DRIVER_STATUS } from '../../../utils/types';

const styles = {
  active: 'bg-emerald-50 text-emerald-600',
  idle: 'bg-amber-50 text-amber-500',
  assigned: 'bg-blue-50 text-blue-600',
  delivering: 'bg-blue-50 text-blue-600',
  pending: 'bg-orange-50 text-orange-600',
  suspended: 'bg-red-50 text-red-600',
  offline: 'bg-slate-50 text-slate-600',
};

const labels = {
  active: 'ACTIVE',
  idle: 'IDLE',
  assigned: 'ASSIGNED',
  delivering: 'DELIVERING',
  pending: 'PENDING_APPROVAL',
  suspended: 'SUSPENDED',
  offline: 'OFFLINE',
};

export default function DriverStatusBadge({ status }) {
  const { t } = useTranslation();
  const key = (status || DRIVER_STATUS.OFFLINE).toLowerCase();
  const label = t(key, { defaultValue: labels[key] || t('UNKNOWN') });

  return (
    <span
      className={`inline-flex items-center justify-center rounded px-4 py-2 text-sm font-bold tracking-wide ${
        styles[key] || 'bg-gray-50 text-gray-500'
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {t(labels[key]) || t('UNKNOWN')}
    </span>
  );
}
