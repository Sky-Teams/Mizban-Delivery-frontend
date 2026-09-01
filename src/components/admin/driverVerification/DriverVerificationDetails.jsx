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
import { InfoColumn } from '../../common/Driver/DriverDetailsHelperComponents';

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
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('DRIVER_VERIFICATION')}</h1>
              <p className="mt-2 text-sm text-gray-500">{t('REVIEW_DRIVER_INFORMATION')}</p>
            </div>

            <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              {t('PENDING_VERIFICATION')}
            </span>
          </div>
        </section>

        {/* Driver Summary */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF1EC] text-3xl font-bold text-[#F25C2A]">
              {selectedDriver.user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{selectedDriver.user?.name}</h2>

              <p className="mt-1 text-gray-500">{selectedDriver.user?.email}</p>

              <p className="text-gray-500">{selectedDriver.user?.phone}</p>
            </div>
          </div>
        </section>

        {/* Information */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Personal Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">{t('PERSONAL_INFO_TITLE')}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoColumn label={t('NAME')} value={selectedDriver.user?.name} />
              <InfoColumn label={t('EMAIL')} value={selectedDriver.user?.email} />
              <InfoColumn label={t('PHONE')} value={selectedDriver.user?.phone} />
              <InfoColumn label={t('ADDRESS')} value={selectedDriver.address} />
            </div>
          </section>

          {/* Vehicle Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">{t('VEHICLE_INFO_TITLE')}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoColumn label={t('VEHICLE_NAME')} value={selectedDriver.vehicleName} />

              <InfoColumn label={t('VEHICLE_TYPE')} value={selectedDriver.vehicleType} />

              <InfoColumn label={t('FUEL_TYPE')} value={selectedDriver.fuelType} />

              <InfoColumn label={t('COLOR')} value={selectedDriver.vehicleColor} />

              <InfoColumn
                label={t('REGISTRATION_NUMBER')}
                value={selectedDriver.vehicleRegistrationNumber}
              />
            </div>
          </section>
        </div>

        {/* Documents */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">{t('DOCS')}</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

        {/* Actions */}
        <section className="sticky bottom-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button text="Reject" variant="secendary" onClick={() => setShowRejectModal(true)} />

            <Button text="Approve" onClick={() => handleApprove(id)} />
          </div>
        </section>

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
