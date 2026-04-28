
import Signup from '../pages/public/auth/Signup';
import Login from '../pages/public/auth/Login';
import CheckEmail from '../pages/public/auth/CheckEmail';
import ResetPassword from '../pages/public/auth/ResetPassword';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';      
import AccessDenied from '../pages/public/AccessDenied';

const publicRoutes=[
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
    path: "/check-email",
    element: <CheckEmail />
    },   
    {
        path:"/reset-password",
        element:<ResetPassword/>
    },
    {
        path: "/request-reset-password",
        element: <RequestResetPassword />
    },
    {
    path:"/access-denied",
    element:<AccessDenied/>
    }
];

export default publicRoutes;
