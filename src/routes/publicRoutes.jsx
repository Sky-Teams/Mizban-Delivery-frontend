
import Signup from '../pages/public/auth/Signup';
import Login from '../pages/public/auth/Login';
import CheckEmail from '../pages/public/auth/CheckEmail';
import ResetPassword from '../pages/public/auth/ResetPassword';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';      
import AccessDenied from '../pages/public/AccessDenied';
import {ROUTE_PATHS} from './routePaths';

import PersonalInfo from '../pages/public/registration/PersonalInfo';
import VehicleInfo from '../pages/public/registration/VehicleInfo';
import DocumentUpload from '../pages/public/registration/DocumentUpload';
import AdditionalInfo from '../pages/public/registration/AdditionalInfo';
import RegistrationAccepted from '../pages/public/registration/RegistrationAccepted';
import RegistrationPending from '../pages/public/registration/RegistrationPending';
import RegistrationRejected from '../pages/public/registration/RegistrationRejected';

const publicRoutes = [
  {
    path: ROUTE_PATHS.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_PATHS.CHECK_EMAIL,
    element: <CheckEmail />,
  },
  {
    path: ROUTE_PATHS.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ROUTE_PATHS.REQUEST_RESET_PASSWORD,
    element: <RequestResetPassword />,
  },
  {
    path: ROUTE_PATHS.ACCESS_DENIED,
    element: <AccessDenied />,
  },
  {
    path: '/registration/personal-info',
    element: <PersonalInfo />,
  },
  {
    path: '/registration/vehicle-info',
    element: <VehicleInfo />,
  },
  {
    path: '/registration/document-upload',
    element: <DocumentUpload />,
  },
  {
    path: '/registration/additional-info',
    element: <AdditionalInfo />,
  },
  {
    path: '/registration/accepted',
    element: <RegistrationAccepted />,
  },
  {
    path: '/registration/pending',
    element: <RegistrationPending />,
  },
  {
    path: '/registration/rejected',
    element: <RegistrationRejected />,
  },
];

export default publicRoutes;
