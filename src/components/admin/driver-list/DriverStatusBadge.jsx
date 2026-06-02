import React from 'react';
import { DRIVER_STATUS } from '../../../utils/types';
import { useTranslation } from 'react-i18next';

const styles = {
  active: 'bg-emerald-100 text-emerald-600',
  idle: 'bg-yellow-100 text-yellow-600',
  assigned: 'bg-blue-100 text-blue-600',
  delivering: 'bg-blue-100 text-blue-600',
  pending: 'bg-orange-100 text-orange-600',
  suspended: 'bg-red-100 text-red-500',
  offline: 'bg-slate-100 text-slate-600',
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
  const key = (status || DRIVER_STATUS.OFFLINE).toLowerCase();

  const { t } = useTranslation();

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[key] || 'bg-gray-100 text-gray-500'
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {t(labels[key]) || t('UNKNOWN')}
    </span>
  );
}
