import React from 'react';
import { useTranslation } from 'react-i18next';
import { DRIVER_STATUS } from '../../../utils/types';
import { FaCircle } from 'react-icons/fa';

const styles = {
  active: 'bg-emerald-100 text-emerald-600',
  idle: 'bg-amber-100 text-amber-500',
  assigned: 'bg-green-100 text-green-600',
  delivering: 'bg-blue-100 text-blue-600',
  pending: 'bg-orange-100 text-orange-600',
  suspended: 'bg-red-100 text-red-600',
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
  const { t } = useTranslation();

  const key = (status || DRIVER_STATUS.OFFLINE).toLowerCase();
  const label = (key, { defaultValue: labels[key] || t('UNKNOWN') });

  return (
    <div className={`rounded-md px-1 py-0.5 grid  ${styles[key] || 'bg-gray-50 text-gray-500'}`}>
      <div className="flex justify-between w-full items-center">

        <span><FaCircle size={7} className='text-white' /></span> 
        <span><FaCircle size={7} className='text-white' /></span>
      </div>
      <div>
        <span className='flex items-center justify-center mx-3 bg-transparent mb-1'>
          {t(labels[key] || 'UNKNOWN')}
        </span>
      </div>
    </div>
  );
}
