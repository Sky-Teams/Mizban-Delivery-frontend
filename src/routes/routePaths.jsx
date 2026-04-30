export const ROUTE_PATHS = {
  // public
  SIGNUP: '/signup',
  LOGIN: '/login',
  CHECK_EMAIL: '/check-email',
  RESET_PASSWORD: '/reset-password',
  REQUEST_RESET_PASSWORD: '/request-reset-password',
  ACCESS_DENIED: '/access-denied',

  // protected
  DASHBOARD: '/',
  ORDERS: '/orders',
  CREATE_ORDER: '/order/create-order',
  EDIT_ORDER: '/orders/edit-order/:id',
  VIEW_ORDER: '/orders/view-order/:id',

  DRIVERS: '/drivers',
  ADD_DRIVER: '/drivers/add',
  EDIT_DRIVER: '/drivers/edit/:id',

  DELIVERIES: '/deliveries',
  ANALYTICS: '/analytics',
  MENU_MANAGER: '/menu-manager',
  SETTINGS: '/settings',
};