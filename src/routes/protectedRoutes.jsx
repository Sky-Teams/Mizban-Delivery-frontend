import Orders from '../pages/admin/Orders';
import OrderForm from "../components/admin/OrderForm";
import CourierList from '../pages/admin/CourierList';
import AddCourier from '../pages/admin/AddCourier';
import EditCourier from '../pages/admin/EditCourier';

const protectedRoutes=[
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
    path:"/couriers",
    element:<CourierList/>
  },
  {
    path:"/couriers/add",
    element:<AddCourier/>
  }, 
  {
    path:"/couriers/edit/:id",
    element:<EditCourier/>
  }
]



export default protectedRoutes;
