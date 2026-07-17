import React, { useEffect, useState } from 'react';
import { PiCaretLeftBold } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import DriverStatusBadge from '../../components/admin/driver-list/DriverStatusBadge';
import { getDriverById } from '../../services/driverService';
import { toLocaleDigits } from '../../utils/numberConverter';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import DriverReusableTable from '../../components/common/Driver/DriverReusableTable';
import { useDriverStore } from '../../store/driver/useDriverStore';

export default function DriverDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [driverError, setDriverError] = useState(null);

  const {
    driverOrders,
    driverOrdersLoading,
    driverOrdersError,
    fetchDriverOrders,
  } = useDriverStore();

  const { t } = useTranslation();

  const lang = i18n.language;

  const tabs = [
    { id: 'personal', label: t('PERSONAL_INFORMATION') },
    { id: 'vehicle', label: t('VEHICLE_INFORMATION') },
    { id: 'orders', label: t('ORDERS_RECORD') },
    { id: 'finance', label: t('FINANCE') },
    { id: 'attachment', label: t('ATTACHMENTS') },
  ];

  useEffect(() => {
  async function loadDriver() {
    try {
      setDriverError(null);

      const response = await getDriverById(id);

      setDriver(response.data);
    } catch (err) {
      setDriverError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

    loadDriver();
  }, [id]);

  useEffect(() => {
    if (activeTab !== 'orders' || !id) return;
    fetchDriverOrders(id);
  }, [activeTab, id, fetchDriverOrders]);

  if (loading) {
    return <div className="flex items-center justify-center text-lg">{t('LOADING')}</div>;
  }

  if (driverError) {
    return (
      <div className="text-center text-red-500 py-10">
        {driverError}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-8 py-6">
      <div className="mb-8 flex items-center gap-5">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
        >
          <PiCaretLeftBold className="text-orange-500" />
        </button>

        <h1 className="text-xl font-bold text-gray-700">
          {t('DRIVER_COMPLETE_INFORMATION', {
            id: toLocaleDigits(driver._id.slice(-5), lang),
          })}
        </h1>
      </div>

      <div className="rounded-sm bg-gray-100 shadow-sm p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src={driver.documents?.photo || 'https://i.pravatar.cc/150?img=8'}
              alt="Driver image"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                {driver.user?.name || t('NOT_PROVIDED')}
              </h2>

              <p className="text-md font-semibold text-gray-500">
                {t('DRIVER_ID_DETAILS_PAGE', {
                  id: toLocaleDigits(driver._id.slice(-5), lang),
                })}
              </p>

              <p className="text-md text-gray-500">
                {t('ACCOUNT_ACTIVATION_DATE')}
                <span className="ml-2 font-medium">
                  {new Date(driver.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>

          <DriverStatusBadge status={driver.status} />
        </div>
      </div>

      {/* tabs of details */}
      <div className="mt-10 border-b">
        <div className="flex gap-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-4 text-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-700 hover:text-orange-500'
              }`}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}

      <div className="py-10">
        {/* Personal */}

        {activeTab === 'personal' && (
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-8">
              <InfoRow label="FULL_NAME" value={driver.user?.name || t('NOT_PROVIDED')} />

              <InfoRow label="PHONE" value={driver.user?.phone || t('NOT_PROVIDED')} />

              <InfoRow label="EMAIL" value={driver.user?.email || t('NOT_PROVIDED')} />

              <InfoRow
                label={t('DATE_OF_BIRTH')}
                value={
                  driver.dateOfBirth
                    ? new Date(driver.dateOfBirth).toLocaleDateString()
                    : t('NOT_PROVIDED')
                }
              />

              <InfoRow label={t('ADDRESS')} value={driver.address || t('NOT_PROVIDED')} />
            </div>

            <div className="space-y-8">
              <InfoRow
                label={t('EMERGENCY_CONTACT')}
                value={driver.emergencyContactName || t('NOT_PROVIDED')}
              />

              <InfoRow
                label={t('EMERGENCY_NUMBER')}
                value={driver.emergencyContactNumber || t('NOT_PROVIDED')}
              />

              <InfoRow
                label={t('RELATION')}
                value={driver.emergencyContactRelation || t('NOT_PROVIDED')}
              />
            </div>
          </div>
        )}

        {activeTab === 'vehicle' && (
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-8">
              <InfoRow label={t('VEHICLE_TYPE')} value={driver.vehicleType || t('NOT_PROVIDED')} />

              <InfoRow label={t('VEHICLE_NAME')} value={driver.vehicleName || t('NOT_PROVIDED')} />

              <InfoRow
                label={t('REGISTRATION_NUMBER')}
                value={driver.vehicleRegistrationNumber || t('NOT_PROVIDED')}
              />

              <InfoRow label={t('FUEL_TYPE')} value={driver.fuelType || t('NOT_PROVIDED')} />
            </div>

            <div className="space-y-8">
              <InfoRow label={t('MAX_WEIGHT')} value={`${driver.capacity?.maxWeightKg || 0} KG`} />

              <InfoRow label={t('MAX_PACKAGES')} value={driver.capacity?.maxPackages || 0} />

              <InfoRow
                label={t('AVAILABLE_TIME')}
                value={`${driver.timeAvailability?.start} - ${driver.timeAvailability?.end}`}
              />
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          driverOrdersError ? (
            <div className="text-red-500">{driverOrdersError}</div>
          ) : (
            <DriverReusableTable
              allOrders={driverOrders}
              loading={driverOrdersLoading}
              error={driverOrdersError}
            />
          )
        )}

        {activeTab === 'finance' && (
          <div className="grid grid-cols-2 gap-20">
            <InfoRow
              label={t('RATING')}
              value={`${driver.ratingAvg} (${driver.ratingCount} reviews)`}
            />

            <InfoRow label={t('ACCEPTANCE_RATE')} value={`${driver.acceptanceRate}%`} />
          </div>
        )}

        {/* Attachments */}

        {activeTab === 'attachment' && (
          <div className="grid grid-cols-2 gap-20">
            <InfoRow
              label={t('NATIONAL_ID_CART_FRONT')}
              value={driver.documents?.nationalIdCard?.front ? t('UPLOADED') : t('NOT_UPLOADED')}
            />

            <InfoRow
              label={t('NATIONAL_ID_CART_BACK')}
              value={driver.documents?.nationalIdCard?.back ? t('UPLOADED') : t('NOT_UPLOADED')}
            />

            <InfoRow
              label={t('DRIVER_LISCENCE')}
              value={driver.documents?.driverLicense ? t('UPLOADED') : t('NOT_UPLOADED')}
            />

            <InfoRow
              label={t('VEHICLE_CARD')}
              value={driver.documents?.vehicleCard ? t('UPLOADED') : t('NOT_UPLOADED')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-8">
      <p className="text-lg font-medium text-[#383838]">{label}</p>

      <p className="text-md text-gray-700">{value}</p>
    </div>
  );
}
