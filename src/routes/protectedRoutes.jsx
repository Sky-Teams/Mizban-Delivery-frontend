import Orders from '../pages/admin/Orders';
import OrderForm from "../components/admin/OrderForm";
import CourierList from '../pages/admin/CourierList';
import AddCourier from '../pages/admin/AddCourier';
import EditCourier from '../pages/admin/EditCourier';
import { ALL_PERMISSIONS } from '../constants/permissions';
import Dashboard from "../pages/admin/Dashboard.jsx"

const protectedRoutes=[
    {
        path: "/orders",
        element: <Orders/>,
        requiredPermission: ALL_PERMISSIONS.VIEW_ALL_ORDERS
    },
    {
    path: "/order/create-order",
    element: <OrderForm />,
    requiredPermission: ALL_PERMISSIONS.CREATE_ORDER
  },

   {
    path: "/orders/edit-order/:id",
    element: <OrderForm />,
    requiredPermission: ALL_PERMISSIONS.EDIT_ORDER
  },
   {
    path: "/orders/view-order/:id",
    element: <OrderForm readOnly={true} />,
    requiredPermission: ALL_PERMISSIONS.VIEW_ORDER_DETAILS
  },
  {
    path:"/drivers",
    element:<CourierList/>,
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
