import { MdOutlineSettingsSuggest } from 'react-icons/md';
import Dropdown from '../../common/Dropdown';
import { useEffect, useState } from 'react';
import useOrderStore from '../../../store/admin/useOrderStore';
import {
  SERVICE_TYPES,
  ORDER_TYPES,
  PRIORITIES,
  PACKAGE_SIZES,
  SERVICE_LEVELS,
} from '../../../constants/orderEnums';
import { changeEnumObjectToArray } from '../../../utils/changeEnumObjectToArray';
import { VALIDATION_RULES } from '../../../utils/validations';
import { useTranslation } from 'react-i18next';
export default function ServiceInfo() {
  const categories = changeEnumObjectToArray(ORDER_TYPES);
  const serviceLevels = changeEnumObjectToArray(SERVICE_LEVELS);
  const priorities = changeEnumObjectToArray(SERVICE_TYPES);
  const serviceTypes = changeEnumObjectToArray(PRIORITIES);
  const [showScheduledFor, setShowScheduledFor] = useState(false);
  const updateOrderData = useOrderStore((state) => state.updateOrderData);
  const serviceType = useOrderStore((state) => state.orderData?.serviceType);
  const type = useOrderStore((state) => state.orderData?.type);
  const serviceLevel = useOrderStore((state) => state.orderData?.serviceLevel);
  const priority = useOrderStore((state) => state.orderData?.priority);
  const scheduledFor = useOrderStore((state) => state.orderData?.scheduledFor);
  const deliveryDeadline = useOrderStore((state) => state.orderData?.deliveryDeadline);
  const visited = useOrderStore((state) => state.visited);

  const { t } = useTranslation();

  const typeError = !VALIDATION_RULES.required(type) && visited['type'];
  const scheduledForError =
    serviceType === SERVICE_TYPES.SCHEDULED &&
    !VALIDATION_RULES.required(scheduledFor) &&
    visited['scheduledFor'];

  useEffect(() => {
    if (serviceType === 'scheduled') {
      setShowScheduledFor(true);
    } else {
      setShowScheduledFor(false);
    }
  }, [serviceType]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const errorStyle = 'text-sm text-red-500 pl-2';
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      {/* Header*/}
      <div className="flex items-center gap-2 mb-6 text-orange-600">
        <MdOutlineSettingsSuggest size={22} />
        <h2 className="text-lg font-bold text-gray-800">{t('SERVICE_DETAILS')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Delivery Category */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">{t('DELIVERY_CATEGORY')}</label>
          <Dropdown
            options={categories}
            value={type}
            placeholder={t('SELECT_CATEGORY')}
            onSelect={(val) => {
              updateOrderData('type', val);
            }}
          />
          {typeError && <span className={errorStyle}>{'PLEASE_SELECT_A_CATEGORY'}</span>}
        </div>

        {/* Service Type */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">{t('SERVICE_TYPE')}</label>
          <Dropdown
            options={serviceTypes}
            value={serviceType}
            placeholder={t('SELECT_TYPE')}
            onSelect={(val) => {
              updateOrderData('serviceType', val);
            }}
          />
        </div>

        {/* Service Level */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">{t('SERVICE_LEVEL')}</label>
          <Dropdown
            options={serviceLevels}
            value={serviceLevel}
            placeholder={t('SELECT_LEVEL')}
            onSelect={(val) => updateOrderData('serviceLevel', val)}
          />
        </div>
        {showScheduledFor && (
          <div>
            <label htmlFor="scheduledFor" className="text-sm font-bold text-gray-700 mb-1">
              {t('SCHEDULED_FOR')}
            </label>
            <input
              type="date"
              id="scheduledFor"
              value={formatDateForInput(scheduledFor)}
              onChange={(e) => updateOrderData('scheduledFor', e.target.value)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all w-full"
            />
            {scheduledForError && <span className={errorStyle}>{t('PLEASE_SELECT_THE_DATE')}</span>}
          </div>
        )}

        {/* Priority */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">{t('PRIORITY')}</label>
          <Dropdown
            options={priorities}
            value={priority}
            placeholder={t('SELECT_PRIORITY')}
            onSelect={(val) => updateOrderData('priority', val)}
          />
        </div>

        {/* Delivery Deadline */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <label htmlFor="deadline" className="text-sm font-bold text-gray-700 mb-1">
            {t('DELIVERY_DEADLINE')}
          </label>
          <input
            type="date"
            id="deadline"
            value={deliveryDeadline}
            onChange={(e) => updateOrderData('deliveryDeadline', e.target.value)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all w-full"
          />
        </div>
      </div>
    </div>
  );
}
