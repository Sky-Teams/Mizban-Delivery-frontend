import { Link } from 'react-router-dom';
import { ALL_PERMISSIONS } from '../constants/permissions';
import AddDriver from '../pages/admin/AddDriver';
import Dashboard from '../pages/admin/Dashboard.jsx';
import DriverList from '../pages/admin/DriverList';
import EditDriver from '../pages/admin/EditDriver';
import Orders from '../pages/admin/Orders';
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
import { ROUTE_PATHS } from './routePaths';

function ReadOnlyOrderPage() {
  return <OrderForm readOnly />;
}

function DeliveriesPage() {
  return <h1>Deliveries page</h1>;
}

function AnalyticsPage() {
  return <h1>Analytics page</h1>;
}

function MenuManagerPage() {
  return <h1>Menu Managing page</h1>;
}

function SettingsPage() {
  return <h1>Settings page</h1>;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">404</h1>
      <p className="mt-3 text-sm text-gray-600">The page you are looking for does not exist.</p>
      <Link
        to={ROUTE_PATHS.DASHBOARD}
        className="mt-6 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
      >
        Return home
      </Link>
    </div>
  );
}

const authRoutes = [
  { path: 'signup', Component: Signup },
  { path: 'login', Component: Login },
  { path: 'check-email', Component: CheckEmail },
  { path: 'reset-password', Component: ResetPassword },
  { path: 'request-reset-password', Component: RequestResetPassword },
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
  { path: 'drivers/add', Component: AddDriver },
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
        ErrorBoundary: RouteErrorBoundary,
        children: authRoutes,
      },
      {
        path: 'registration',
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
