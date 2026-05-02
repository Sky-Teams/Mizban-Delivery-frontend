﻿import Orders from '../pages/admin/Orders';
import OrderHistory from '../pages/common/OrderHistory.jsx';
import OrderForm from '../components/admin/OrderForm';
import DriverList from '../pages/admin/DriverList';
import AddDriver from '../pages/admin/AddDriver';
import EditDriver from '../pages/admin/EditDriver';
import { ALL_PERMISSIONS } from '../constants/permissions';
import Dashboard from '../pages/admin/Dashboard.jsx';
import NotificationInbox from "../pages/admin/NotificationInbox.jsx"
const protectedRoutes = [
  {
    path: '/orders',
    element: <Orders />,
    requiredPermission: ALL_PERMISSIONS.VIEW_ALL_ORDERS,
  },
  {
    path: '/order/create-order',
    element: <OrderForm />,
    requiredPermission: ALL_PERMISSIONS.CREATE_ORDER,
  },
  {
    path: '/orders/edit-order/:id',
    element: <OrderForm />,
    requiredPermission: ALL_PERMISSIONS.EDIT_ORDER,
  },
  {
    path: '/orders/view-order/:id',
    element: <OrderForm readOnly={true} />,
    requiredPermission: ALL_PERMISSIONS.VIEW_ORDER_DETAILS,
  },
  {
    path: '/drivers',
    element: <DriverList />,
  },
  {
    path: '/drivers/add',
    element: <AddDriver />,
  },
  {
    path: '/order-history',
    element: <OrderHistory />
  },
  {
    path:'/',
    element:<Dashboard />
  },
  {
    path: '/drivers/edit/:id',
    element: <EditDriver />,
  },
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/deliveries',
    element: <h1>Deliveries page</h1>,
  },
  {
    path: '/analytics',
    element: <h1>Analytics page</h1>,
  },
  {
    path:"/settings",
    element:<h1>Settings page</h1>
  },
  {
    path: "/notifications",
    element: <NotificationInbox />
  },  
  {
    path: "/menu-manager",
    element: <h1>Menu Managing page</h1>,
  },
  {
    path: '/settings',
    element: <h1>Settings page</h1>,
  },
];

export default protectedRoutes;
