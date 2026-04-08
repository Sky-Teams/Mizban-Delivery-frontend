import Orders from '../pages/admin/Orders';
import OrderForm from "../components/admin/OrderForm";
import CourierList from '../pages/admin/CourierList';
import AddCourier from '../pages/admin/AddCourier';
import EditCourier from '../pages/admin/EditCourier';
import CheckEmail from '../pages/public/auth/checkEmail';
import OtpVerification from '../pages/public/auth/OtpVerification';
import ResetPassword from '../pages/public/auth/ResetPassword';
import RequestResetPassword from '../pages/public/auth/RequestResetPassword';
import Dashboard from "../pages/admin/Dashboard.jsx"

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
  },
  {
    path:"/",
    element:<Dashboard />
  },
  {
    path:"/deliveries",
    element:<h1>Deliveries page</h1>
  },
  {
    path:"/analytics",
    element:<h1>Analytics page</h1>
  },
  {
    path:"/menu-manager",
    element:<h1>Menu Managing page</h1>
  },
  {
    path:"/settings",
    element:<h1>Settings page</h1>
  }
  
  
]



export default protectedRoutes;
