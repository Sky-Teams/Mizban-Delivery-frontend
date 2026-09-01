import { useTranslation } from 'react-i18next';
import { Popup, useMapEvents } from 'react-leaflet';

export const DriverPopup = ({ driver, title }) => {
  const { t } = useTranslation();

  return (
    <Popup>
      <div className="text-xs leading-tight">
        <p className="font-semibold text-sm mb-1">
          {t('DRIVER_DETAILS')}: {title}
        </p>
        <p className="m-0">
          <span className="font-medium">{t('NAME')}:</span> {driver.name}
        </p>
        <p className="m-0">
          <span className="font-medium">{t('EMAIL')}:</span> {driver.email}
        </p>
        <p className="m-0">
          <span className="font-medium">{t('PHONE')}:</span> {driver.phone}
        </p>
        <p className="m-0">
          <span className="font-medium">{t('VEHICLE_TYPE')}:</span> {driver.vehicleType}
        </p>
        <p className="m-0">
          <span className="font-medium">{t('VEHICLE_REGISTRATION')}:</span>{' '}
          {driver.vehicleRegistrationNumber}
        </p>
      </div>
    </Popup>
  );
};

export const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: () => {
      onMapClick();
    },
  });

  return null;
};
