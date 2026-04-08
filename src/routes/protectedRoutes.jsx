import Orders from '../pages/admin/Orders';
import OrderForm from "../components/admin/OrderForm";
import CourierList from '../pages/admin/CourierList';
import AddCourier from '../pages/admin/AddCourier';
import EditCourier from '../pages/admin/EditCourier';
import CheckEmail from '../pages/public/auth/checkEmail';
import OtpVerification from '../pages/public/auth/OtpVerification';
import ResetPassword from '../pages/public/auth/ResetPassword';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';

const protectedRoutes=[
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
    },
    {
    path: "/orders",
    element: <Orders/>
    },
    {
    path: "/order/create-order",
    element: <OrderForm />,
  },
   {
    path: "/orders/edit-order/:id",
    element: <OrderForm />,
  },
   {
    path: "/orders/view-order/:id",
    element: <OrderForm readOnly={true} />,
  },
  {
    path:"/drivers",
    element:<CourierList/>
  },
  {
    path:"/drivers/add",
    element:<AddCourier/>
  }, 
  {
    path:"/drivers/edit/:id",
    element:<EditCourier/>
  }
]



export default protectedRoutes;
