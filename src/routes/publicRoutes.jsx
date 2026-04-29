import Signup from '../pages/public/Signup';
// import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import AccessDenied from '../pages/public/AccessDenied';

import PersonalInfo from '../pages/public/registration/PersonalInfo';
import VehicleInfo from '../pages/public/registration/VehicleInfo';
import DocumentUpload from '../pages/public/registration/DocumentUpload';
import AdditionalInfo from '../pages/public/registration/AdditionalInfo';
import RegistrationAccepted from '../pages/public/registration/RegistrationAccepted';
import RegistrationPending from '../pages/public/registration/RegistrationPending';
import RegistrationRejected from '../pages/public/registration/RegistrationRejected';

const publicRoutes = [
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/access-denied',
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
