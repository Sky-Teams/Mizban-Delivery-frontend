import Orders from '../pages/admin/Orders';
import OrderForm from "../components/admin/OrderForm";

const protectedRoutes=[
    {
        path: "/orders",
        element: <Orders/>
    },
    {
    path: "/orders/create-order",
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
]



export default protectedRoutes;
