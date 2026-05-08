import { useTranslation } from 'react-i18next';
import useOrderStore from '../../../store/admin/useOrderStore';
import Map from '../../common/order/Map';
import { LuMapPin, LuNavigation } from 'react-icons/lu';

export default function Location() {
  const inputStyle =
    'p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 font-mono outline-none w-full';
  const labelStyle = 'text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider';

  const pickupLocation = useOrderStore((state) => state.orderData.pickupLocation.coordinates);
  const dropoffLocation = useOrderStore((state) => state.orderData.dropoffLocation.coordinates);
  const visited = useOrderStore((state) => state.visited);

  const pickupLocationError =
    (pickupLocation[0] === 0 || pickupLocation[1] === 0) && visited['pickupLocation.coordinates'];
  const dropoffLocationError =
    (dropoffLocation[0] === 0 || dropoffLocation[1] === 0) &&
    visited['dropoffLocation.coordinates'];

  const {t} = useTranslation()

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 h-[400px] rounded-xl overflow-hidden border border-gray-100 shadow-inner">
          <Map />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center gap-8">
          {/* Pick Up Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600">
              <LuMapPin size={20} />
              <h2 className="text-lg font-bold text-gray-800">{t('PICK_UP_LOCATION')}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="pick-lat" className={labelStyle}>
                  {t('LONGITUDE')}
                </label>
                <input
                  type="text"
                  id="pick-lat"
                  value={pickupLocation[0]}
                  readOnly
                  className={inputStyle}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="pick-long" className={labelStyle}>
                  {t('LATITUDE')}
                </label>
                <input
                  type="text"
                  id="pick-long"
                  value={pickupLocation[1]}
                  readOnly
                  className={inputStyle}
                />
              </div>
            </div>
            {pickupLocationError && (
              <span className="text-red-500 text-[13px] w-full text-center pl-3">
                {t('PICKUP_LOCATION_COORDINATES_REQUIRED')}
              </span>
            )}
          </div>

          <hr className="border-gray-50" />

          {/* Drop Off Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600">
              <LuNavigation size={20} />
              <h2 className="text-lg font-bold text-gray-800">{t('DROP_OFF_LOCATION')}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="drop-lat" className={labelStyle}>
                  {t('LONGITUDE')}
                </label>
                <input
                  type="text"
                  id="drop-lat"
                  value={dropoffLocation[0]}
                  readOnly
                  className={inputStyle}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="drop-long" className={labelStyle}>
                  {t('LATITUDE')}
                </label>
                <input
                  type="text"
                  id="drop-long"
                  value={dropoffLocation[1]}
                  readOnly
                  className={inputStyle}
                />
              </div>
            </div>
            {dropoffLocationError && (
              <span className="text-red-500 text-[13px] w-full text-center pl-3">
                {t('DROPOFF_LOCATION_COORDINATES_REQUIRED')}
              </span>
            )}
          </div>

          <div>
            <span className="italic text-gray-500 text-sm">
              {t('CLICK_THE_MAP_FOR_MANIPULATION')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
