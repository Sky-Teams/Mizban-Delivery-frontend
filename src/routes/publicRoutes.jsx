import Signup from '../pages/public/auth/Signup';
import Login from '../pages/public/auth/Login';
import CheckEmail from '../pages/public/auth/checkEmail';
import OtpVerification from '../pages/public/auth/OtpVerification';
import ResetPassword from '../pages/public/auth/ResetPassword';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';      
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
        path: "/otp-verification",
        element:<OtpVerification/>
    },
    {
        path:"/reset-password",
        element:<ResetPassword/>
    },
    {
        path: "/request-reset-password",
        element: <RequestResetPassword />
    }
];


export default publicRoutes;