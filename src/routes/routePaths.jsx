export const ROUTE_PATHS = {
  // public
  SIGNUP: '/signup',
  LOGIN: '/login',
  CHECK_EMAIL: '/check-email',
  RESET_PASSWORD: '/reset-password',
  REQUEST_RESET_PASSWORD: '/request-reset-password',
  ACCESS_DENIED: '/access-denied',

  // registration
  REGISTRATION: '/registration',
  PERSONAL_INFO: '/registration/personal-info',
  VEHICLE_INFO: '/registration/vehicle-info',
  DOCUMENT_UPLOAD: '/registration/document-upload',
  ADDITIONAL_INFO: '/registration/additional-info',
  REGISTRATION_ACCEPTED: '/registration/accepted',
  REGISTRATION_PENDING: '/registration/pending',
  REGISTRATION_REJECTED: '/registration/rejected',



  // protected
  DASHBOARD: '/',
  ORDERS: '/orders',
  CREATE_ORDER: '/order/create-order',
  EDIT_ORDER: '/orders/edit-order/:id',
  VIEW_ORDER: '/orders/view-order/:id',
  ORDER_HISTORY: '/order-history',
 

  DRIVERS: '/drivers',
  ADD_DRIVER: '/drivers/add',
  EDIT_DRIVER: '/drivers/edit/:id',

  DELIVERIES: '/deliveries',
  ANALYTICS: '/analytics',
  MENU_MANAGER: '/menu-manager',
  SETTINGS: '/settings',
};
