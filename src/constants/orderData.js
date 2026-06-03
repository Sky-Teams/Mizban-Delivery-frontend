import { SERVICE_TYPES, PRIORITIES, SERVICE_LEVELS } from './orderEnums';

export const orderDataObject = {
  type: '',
  serviceType: SERVICE_TYPES.IMMEDIATE,
  scheduledFor: null,
  deliveryDeadline: null,
  priority: PRIORITIES.NORMAL,
  sender: {
    name: '',
    phone: '',
  },
  receiver: {
    name: '',
    phone: '',
    address: '',
  },
  pickupLocation: {
    type: 'Point',
    coordinates: [0, 0],
  },
  dropoffLocation: {
    type: 'Point',
    coordinates: [0, 0],
  },
  items: [],
  packageDetails: {
    weight: 0.0,
    size: '',
    fragile: false,
    note: '',
  },
  serviceLevel: SERVICE_LEVELS.STANDARD,
  paymentType: '',
  amountToCollect: 0,
  deliveryPrice: {
    discount: 0,
    total: 0,
  },
  finalPrice: 0,
};
