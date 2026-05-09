import { MdOutlineSettingsSuggest } from 'react-icons/md';
import Dropdown from '../../common/Dropdown';
import { useEffect, useState } from 'react';
import useOrderStore from '../../../store/orders/useOrderStore';
import useOrderFormStore from '../../../store/orders/useOrderFormStore';
import {
  SERVICE_TYPES,
  ORDER_TYPES,
  PRIORITIES,
  PACKAGE_SIZES,
  SERVICE_LEVELS,
} from '../../../constants/orderEnums';
import { changeEnumObjectToArray } from '../../../utils/changeEnumObjectToArray';
import { VALIDATION_RULES } from '../../../utils/validations';
export default function ServiceInfo() {
  const categories = changeEnumObjectToArray(ORDER_TYPES);
  const serviceLevels = changeEnumObjectToArray(SERVICE_LEVELS);
  const priorities = changeEnumObjectToArray(SERVICE_TYPES);
  const serviceTypes = changeEnumObjectToArray(PRIORITIES);
  const [showScheduledFor, setShowScheduledFor] = useState(false);
  const orderData = useOrderFormStore((state) => state.orderData || {});
  const updateOrderData = useOrderFormStore((state) => state.updateOrderData);
  const serviceType = useOrderFormStore((state) => state.orderData.serviceType);
  const type = orderData.type;
  const serviceLevel = useOrderFormStore((state) => state.orderData.serviceLevel);
  const priority = useOrderFormStore((state) => state.orderData.priority);
  const scheduledFor = useOrderFormStore((state) => state.orderData.scheduledFor);
  const deliveryDeadline = useOrderFormStore((state) => state.orderData.deliveryDeadline);
  const visited = useOrderFormStore((state) => state.visited);
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
        <h2 className="text-lg font-bold text-gray-800">Service Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Delivery Category */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Delivery Category</label>
          <Dropdown
            options={categories}
            value={type}
            placeholder="Select Category"
            onSelect={(val) => {
              updateOrderData('type', val);
            }}
          />
          {typeError && <span className={errorStyle}>Please select a category</span>}
        </div>

        {/* Service Type */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Service Type</label>
          <Dropdown
            options={serviceTypes}
            value={serviceType}
            placeholder="Select Type"
            onSelect={(val) => {
              updateOrderData('serviceType', val);
            }}
          />
        </div>

        {/* Service Level */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Service Level</label>
          <Dropdown
            options={serviceLevels}
            value={serviceLevel}
            placeholder="Select Level"
            onSelect={(val) => updateOrderData('serviceLevel', val)}
          />
        </div>
        {showScheduledFor && (
          <div>
            <label htmlFor="scheduledFor" className="text-sm font-bold text-gray-700 mb-1">
              Scheduled For
            </label>
            <input
              type="date"
              id="scheduledFor"
              value={formatDateForInput(scheduledFor)}
              onChange={(e) => updateOrderData('scheduledFor', e.target.value)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition-all w-full"
            />
            {scheduledForError && <span className={errorStyle}>Please select the date</span>}
          </div>
        )}

        {/* Priority */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Priority</label>
          <Dropdown
            options={priorities}
            value={priority}
            placeholder="Select Priority"
            onSelect={(val) => updateOrderData('priority', val)}
          />
        </div>

        {/* Delivery Deadline */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <label htmlFor="deadline" className="text-sm font-bold text-gray-700 mb-1">
            Delivery Deadline
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
