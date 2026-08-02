import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { InfoRow } from '../../common/Driver/DriverDetailsHelperComponents';
import { ImageHolder } from '../../common/Driver/DriverDetailsHelperComponents';
import Button from '../../common/order/Button';
import { approveDriver } from '../../../services/driverService';
import { rejectDriver } from '../../../services/driverService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import RejectDriverModal from './RejectDriverModal';

export default function DriverVerificationDetails() {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fetchDriverById = useDriverStore((state) => state.fetchDriverById);
  const selectedDriver = useDriverStore((state) => state.selectedDriver);
  const loading = useDriverStore((state) => state.isLoading);

  const handleApprove = async () => {
    try {
      await approveDriver(id);

      toast.success(t('DRIVER_APPROVED_SUCCESS'));

      navigate(-1);
    } catch (error) {
      toast.error(error.message || t('ERROR_APPROVAL'));
    }
  };

  const handleReject = async (rejectReason) => {
    try {
      await rejectDriver(id, rejectReason);

      toast.success(t('DRIVER_REJECTED_SUCCESS'));

      setShowRejectModal(false);

      navigate(-1);
    } catch (error) {
      toast.error(error.message || t('ERROR_REJECTION'));
    }
  };

  useEffect(() => {
    if (id) {
      fetchDriverById(id);
    }
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">{t('LOADING')}</div>;
  }

  if (!selectedDriver) {
    return <div className="p-10 text-center">{t('DRIVER_NOT_FOUND')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold">{t('DRIVER_VERIFICATION')}</h1>

        {/* personal info */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">{t('PERSONAL_INFO_TITLE')}</h2>

          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Name" value={selectedDriver.user?.name} />
            <InfoRow label="Email" value={selectedDriver.user?.email} />
            <InfoRow label="Phone" value={selectedDriver.user?.phone} />
            <InfoRow label="Address" value={selectedDriver.address} />
          </div>
        </section>

        {/* info of vehicle */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">{t('VEHICLE_INFO_TITLE')}</h2>

          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Vehicle Name" value={selectedDriver.vehicleName} />
            <InfoRow label="Vehicle Type" value={selectedDriver.vehicleType} />
            <InfoRow label="Fuel Type" value={selectedDriver.fuelType} />
            <InfoRow label="Color" value={selectedDriver.vehicleColor} />
            <InfoRow label="Registration Number" value={selectedDriver.vehicleRegistrationNumber} />
          </div>
        </section>

        {/* attachemnts */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">{t('DOCS')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <ImageHolder
              label={t('NATIONAL_ID_CART_FRONT')}
              image={selectedDriver.documents?.nationalIdCard?.front}
            />
            <ImageHolder
              label={t('NATIONAL_ID_CART_BACK')}
              image={selectedDriver.documents?.nationalIdCard?.back}
            />
            <ImageHolder
              label={t('DRIVER_LISCENCE')}
              image={selectedDriver.documents?.driverLicense}
            />
            <ImageHolder label={t('VEHICLE_CARD')} image={selectedDriver.documents?.vehicleCard} />
          </div>
        </section>

        {/* actions */}
        <div className="flex justify-end gap-4">
          <Button text="Approve" onClick={() => handleApprove(id)} />
          <Button text="Reject" variant="secendary" onClick={() => setShowRejectModal(true)} />
        </div>

        {showRejectModal && (
          <RejectDriverModal
            isOpen={showRejectModal}
            onClose={() => setShowRejectModal(false)}
            onConfirm={handleReject}
          />
        )}
      </div>
    </div>
  );
}
