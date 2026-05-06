import Orders from '../pages/admin/Orders';
import OrderHistory from '../pages/common/OrderHistory.jsx';
import OrderForm from '../components/admin/OrderForm';
import { ALL_PERMISSIONS } from '../constants/permissions';
import Dashboard from '../pages/admin/Dashboard.jsx';
import NotificationInbox from '../pages/admin/NotificationInbox.jsx';
import DriverList from '../pages/admin/DriverList';
import AddDriver from '../pages/admin/AddDriver';
import EditDriver from '../pages/admin/EditDriver';
import {ROUTE_PATHS} from './routePaths.jsx';

const protectedRoutes = [
  {
    path: ROUTE_PATHS.ORDERS,
    element: <Orders />,
    requiredPermission: ALL_PERMISSIONS.VIEW_ALL_ORDERS,
  },
  {
    path: ROUTE_PATHS.CREATE_ORDER,
    element: <OrderForm />,
    requiredPermission: ALL_PERMISSIONS.CREATE_ORDER,
  },
  {
    path: ROUTE_PATHS.EDIT_ORDER,
    element: <OrderForm />,
    requiredPermission: ALL_PERMISSIONS.EDIT_ORDER,
  },
  {
    path: ROUTE_PATHS.VIEW_ORDER,
    element: <OrderForm readOnly={true} />,
    requiredPermission: ALL_PERMISSIONS.VIEW_ORDER_DETAILS,
  },
  {
    path: ROUTE_PATHS.DRIVERS,
    element: <DriverList />,
  },
  {
    path: ROUTE_PATHS.ADD_DRIVER,
    element: <AddDriver />,
  },
  {
    path: ROUTE_PATHS.ORDER_HISTORY,
    element: <OrderHistory />
  },
  {
    path:ROUTE_PATHS.DASHBOARD,
    element:<Dashboard />
  },
  {
    path: ROUTE_PATHS.EDIT_DRIVER,
    element: <EditDriver />,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTE_PATHS.DELIVERIES,
    element: <h1>Deliveries page</h1>,
  },
  {
    path: ROUTE_PATHS.ANALYTICS,
    element: <h1>Analytics page</h1>,
  },
  {
    path: ROUTE_PATHS.MENU_MANAGER,
    element: <h1>Menu Managing page</h1>,
  },
  {
    path: ROUTE_PATHS.SETTINGS,
    element: <h1>Settings page</h1>,
  },
  {
    path: ROUTE_PATHS.NOTIFICATION_INBOX,
    element: <NotificationInbox />
  }
];

export default protectedRoutes;
