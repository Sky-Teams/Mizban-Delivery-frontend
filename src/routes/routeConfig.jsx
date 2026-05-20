import { ALL_PERMISSIONS } from '../constants/permissions';
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
import RouteErrorBoundary from './RouteErrorBoundary';

const authRoutes = [
  { path: 'signup', Component: Signup, guestOnly: true },
  { path: 'login', Component: Login, guestOnly: true },
  { path: 'check-email', Component: CheckEmail, guestOnly: true },
  { path: 'reset-password', Component: ResetPassword, guestOnly: true },
  { path: 'request-reset-password', Component: RequestResetPassword, guestOnly: true },
  { path: 'access-denied', Component: AccessDenied },
];

const registrationRoutes = [
  { path: 'personal-info', Component: PersonalInfo },
  { path: 'vehicle-info', Component: VehicleInfo },
  { path: 'document-upload', Component: DocumentUpload },
  { path: 'additional-info', Component: AdditionalInfo },
  { path: 'accepted', Component: RegistrationAccepted },
  { path: 'pending', Component: RegistrationPending },
  { path: 'rejected', Component: RegistrationRejected },
];

const appRoutes = [
  { index: true, Component: Dashboard },
  {
    path: 'orders',
    Component: Orders,
    requiredPermission: ALL_PERMISSIONS.VIEW_ALL_ORDERS,
  },
  {
    path: 'order/create-order',
    Component: OrderForm,
    requiredPermission: ALL_PERMISSIONS.CREATE_ORDER,
  },
  {
    path: 'orders/edit-order/:id',
    Component: OrderForm,
    requiredPermission: ALL_PERMISSIONS.EDIT_ORDER,
  },
  {
    path: 'orders/view-order/:id',
    Component: ReadOnlyOrderPage,
    requiredPermission: ALL_PERMISSIONS.VIEW_ORDER_DETAILS,
  },
  { path: 'drivers', Component: DriverList },
  { path: 'drivers/edit/:id', Component: EditDriver },
  { path: 'order-history', Component: OrderHistory },
  { path: 'deliveries', Component: DeliveriesPage },
  { path: 'analytics', Component: AnalyticsPage },
  { path: 'menu-manager', Component: MenuManagerPage },
  { path: 'settings', Component: SettingsPage },
];

const routeConfig = [
  {
    path: '/',
    ErrorBoundary: RouteErrorBoundary,
    children: [
      {
        Component: AuthLayout,
        children: authRoutes,
      },
      {
        path: 'registration',
        Component: RegistrationLayout,
        children: registrationRoutes,
      },
      {
        Component: AppLayout,
        requireAuth: true,
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
