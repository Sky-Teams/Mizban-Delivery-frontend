import { ALL_PERMISSIONS, ROLES } from '../constants/permissions';
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
import NotificationInbox from '../pages/admin/NotificationInbox.jsx';
import VerifyEmail from '../pages/public/auth/VerifyEmail.jsx';
import { LiveTrackingDemo } from '../pages/common/LiveTrackingDemo.jsx';
import DriverVerification from '../pages/admin/DriverVerification.jsx';
import DriverVerificationDetails from '../components/admin/driverVerification/DriverVerificationDetails.jsx';
import DriverDetails from '../pages/admin/DriverDetails.jsx';
import RegistrationEntry from '../utils/RegistrationEntry.jsx';

const authRoutes = [
  { path: 'signup', Component: Signup, guestOnly: true },
  { path: 'login', Component: Login, guestOnly: true },
  { path: 'check-email', Component: CheckEmail, guestOnly: true },
  { path: 'reset-password/:resetToken', Component: ResetPassword, guestOnly: true },
  { path: 'request-new-password', Component: RequestResetPassword, guestOnly: true },
  { path: 'access-denied', Component: AccessDenied },
  { path: 'verify-email/:verificationToken', Component: VerifyEmail },
];

const registrationRoutes = [
  { index: true,Component: RegistrationEntry, registrationRoute: true },
  { path: 'personal-info', Component: PersonalInfo, registrationRoute: true },
  { path: 'vehicle-info', Component: VehicleInfo, registrationRoute: true },
  { path: 'document-upload', Component: DocumentUpload, registrationRoute: true },
  { path: 'additional-info', Component: AdditionalInfo, registrationRoute: true },
  { path: 'accepted', Component: RegistrationAccepted, registrationRoute: true },
  { path: 'pending', Component: RegistrationPending, registrationRoute: true },
  { path: 'rejected', Component: RegistrationRejected, registrationRoute: true },
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
  { path: 'notifications',Component: NotificationInbox,},
  { 
    path: 'driver-verification', 
    Component: DriverVerification,
    requiredPermission: ALL_PERMISSIONS.DRIVER_VERIFICATION,
  },
  { 
    path: 'driver-verification/:id/driver-details', 
    Component: DriverVerificationDetails,
    requiredPermission: ALL_PERMISSIONS.DriverVerificationDetails,
  },
  {
    path: 'drivers/details/:id',
    Component: DriverDetails,
    requiredPermission: ALL_PERMISSIONS.DRIVER_DETAILS,
  },
  { path: 'demo', Component: LiveTrackingDemo },
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
        requireAuth: true,
        registrationRoute: true,
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
