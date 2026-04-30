
import Signup from '../pages/public/auth/Signup';
import Login from '../pages/public/auth/Login';
import CheckEmail from '../pages/public/auth/CheckEmail';
import ResetPassword from '../pages/public/auth/ResetPassword';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';      
import AccessDenied from '../pages/public/AccessDenied';
import {ROUTE_PATHS} from './routePaths';

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
];

export default publicRoutes;
