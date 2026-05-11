import Button from './Button';
import SearchableDropdown from '../SearchableDropdown';
import useOrderStore from '../../../store/admin/useOrderStore';
import toast from 'react-hot-toast';
import { LuX } from 'react-icons/lu';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll';
import { useTranslation } from 'react-i18next';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { useState } from 'react';

export default function AssignDriver({ onClose, isOpen, orderId }) {
  const assignDriverToOrder = useOrderStore((state) => state.assignDriverToOrder);
  const drivers = useDriverStore((state) => state.drivers);
  const [driver, setDriver] = useState('');
  const [driverDetails, setDriverDetails] = useState(null);
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleDriverConfirm = () => {
    if (!driverDetails?.id) {
      toast.error(t('SELECT_A_DRIVER'));
      return;
    }

    assignDriverToOrder(orderId, driverDetails.id);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  useLockBodyScroll(isOpen);

  return (
    <div className="fixed  overflow-hidden inset-0 z-[50] flex items-center justify-center p-4">
      <div className="absolute  inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={handleCancel} />
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl z-10">
        <div className="p-6 flex w-full flex-col items-start gap-4">
          <button
            className="self-end hover:bg-orange-600 hover:text-white p-2 cursor-pointer rounded-[24px] transition ease-out"
            onClick={onClose}
          >
            <LuX />
          </button>
          <h2 className="text-xl font-bold">{t('ASSIGN_DRIVER')}</h2>
          <p className="text-gray-600">{t('SELECT_DRIVER')}</p>

          <SearchableDropdown
            onSelect={setDriver}
            drivers={drivers}
            getDriverDetails={setDriverDetails}
          />

          <div className="flex gap-3 justify-start w-full">
            <Button onClick={handleCancel} variant="secondary" text={t('CANCLE')} />
            <Button onClick={handleDriverConfirm} variant="primary" text={t('CONFIRM')} />
          </div>
        </div>
      </div>
    </div>
  );
}
