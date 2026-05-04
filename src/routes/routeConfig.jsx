import { ALL_PERMISSIONS } from '../constants/permissions';
import AddDriver from '../pages/admin/AddDriver';
import AnalyticsPage from '../pages/admin/AnalyticsPage';
import Dashboard from '../pages/admin/Dashboard.jsx';
import DeliveriesPage from '../pages/admin/DeliveriesPage';
import DriverList from '../pages/admin/DriverList';
import EditDriver from '../pages/admin/EditDriver';
import MenuManagerPage from '../pages/admin/MenuManagerPage';
import Orders from '../pages/admin/Orders';
import ReadOnlyOrderPage from '../pages/admin/ReadOnlyOrderPage';
import SettingsPage from '../pages/admin/SettingsPage';
import NotFoundPage from '../pages/common/NotFoundPage';
import OrderHistory from '../pages/common/OrderHistory.jsx';
import AccessDenied from '../pages/public/AccessDenied';
import CheckEmail from '../pages/public/auth/CheckEmail';
import Login from '../pages/public/auth/Login';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';
import ResetPassword from '../pages/public/auth/ResetPassword';
import Signup from '../pages/public/auth/Signup';
import AdditionalInfo from '../pages/public/registration/AdditionalInfo';
import DocumentUpload from '../pages/public/registration/DocumentUpload';
import PersonalInfo from '../pages/public/registration/PersonalInfo';
import RegistrationAccepted from '../pages/public/registration/RegistrationAccepted';
import RegistrationPending from '../pages/public/registration/RegistrationPending';
import RegistrationRejected from '../pages/public/registration/RegistrationRejected';
import VehicleInfo from '../pages/public/registration/VehicleInfo';
import AppLayout from '../layout/AppLayout';
import AuthLayout from '../layout/AuthLayout';
import RegistrationLayout from '../layout/RegistrationLayout';
import OrderForm from '../components/admin/OrderForm';
import { toNestedRoutePath, toRoutePath } from './routeHelpers';
import RouteErrorBoundary from './RouteErrorBoundary';
import { ROUTE_PATHS } from './routePaths';

const authRoutes = [
  { path: toRoutePath(ROUTE_PATHS.SIGNUP), Component: Signup },
  { path: toRoutePath(ROUTE_PATHS.LOGIN), Component: Login },
  { path: toRoutePath(ROUTE_PATHS.CHECK_EMAIL), Component: CheckEmail },
  { path: toRoutePath(ROUTE_PATHS.RESET_PASSWORD), Component: ResetPassword },
  { path: toRoutePath(ROUTE_PATHS.REQUEST_RESET_PASSWORD), Component: RequestResetPassword },
  { path: toRoutePath(ROUTE_PATHS.ACCESS_DENIED), Component: AccessDenied },
];

const registrationRoutes = [
  {
    path: toNestedRoutePath(ROUTE_PATHS.PERSONAL_INFO, ROUTE_PATHS.REGISTRATION),
    Component: PersonalInfo,
  },
  {
    path: toNestedRoutePath(ROUTE_PATHS.VEHICLE_INFO, ROUTE_PATHS.REGISTRATION),
    Component: VehicleInfo,
  },
  {
    path: toNestedRoutePath(ROUTE_PATHS.DOCUMENT_UPLOAD, ROUTE_PATHS.REGISTRATION),
    Component: DocumentUpload,
  },
  {
    path: toNestedRoutePath(ROUTE_PATHS.ADDITIONAL_INFO, ROUTE_PATHS.REGISTRATION),
    Component: AdditionalInfo,
  },
  {
    path: toNestedRoutePath(ROUTE_PATHS.REGISTRATION_ACCEPTED, ROUTE_PATHS.REGISTRATION),
    Component: RegistrationAccepted,
  },
  {
    path: toNestedRoutePath(ROUTE_PATHS.REGISTRATION_PENDING, ROUTE_PATHS.REGISTRATION),
    Component: RegistrationPending,
  },
  {
    path: toNestedRoutePath(ROUTE_PATHS.REGISTRATION_REJECTED, ROUTE_PATHS.REGISTRATION),
    Component: RegistrationRejected,
  },
];

const appRoutes = [
  { index: true, Component: Dashboard },
  {
    path: toRoutePath(ROUTE_PATHS.ORDERS),
    Component: Orders,
    requiredPermission: ALL_PERMISSIONS.VIEW_ALL_ORDERS,
  },
  {
    path: toRoutePath(ROUTE_PATHS.CREATE_ORDER),
    Component: OrderForm,
    requiredPermission: ALL_PERMISSIONS.CREATE_ORDER,
  },
  {
    path: toRoutePath(ROUTE_PATHS.EDIT_ORDER),
    Component: OrderForm,
    requiredPermission: ALL_PERMISSIONS.EDIT_ORDER,
  },
  {
    path: toRoutePath(ROUTE_PATHS.VIEW_ORDER),
    Component: ReadOnlyOrderPage,
    requiredPermission: ALL_PERMISSIONS.VIEW_ORDER_DETAILS,
  },
  { path: toRoutePath(ROUTE_PATHS.DRIVERS), Component: DriverList },
  { path: toRoutePath(ROUTE_PATHS.ADD_DRIVER), Component: AddDriver },
  { path: toRoutePath(ROUTE_PATHS.EDIT_DRIVER), Component: EditDriver },
  { path: toRoutePath(ROUTE_PATHS.ORDER_HISTORY), Component: OrderHistory },
  { path: toRoutePath(ROUTE_PATHS.DELIVERIES), Component: DeliveriesPage },
  { path: toRoutePath(ROUTE_PATHS.ANALYTICS), Component: AnalyticsPage },
  { path: toRoutePath(ROUTE_PATHS.MENU_MANAGER), Component: MenuManagerPage },
  { path: toRoutePath(ROUTE_PATHS.SETTINGS), Component: SettingsPage },
];

const routeConfig = [
  {
    path: '/',
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        Component: AuthLayout,
        ErrorBoundary: RouteErrorBoundary,
        children: authRoutes,
      },
      {
        path: toRoutePath(ROUTE_PATHS.REGISTRATION),
        Component: RegistrationLayout,
        ErrorBoundary: RouteErrorBoundary,
        children: registrationRoutes,
      },
      {
        Component: AppLayout,
        requireAuth: true,
        ErrorBoundary: RouteErrorBoundary,
        children: appRoutes,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
];

export default routeConfig;
