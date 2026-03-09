import Orders from '../pages/admin/Orders';
import CreateOrder from '../components/admin/CreateOrder';

const protectedRoutes=[
    {
        path: "/orders",
        element: <Orders/>
    },
    {
        path: "/create-order",
        element: <CreateOrder/>,
    }
]

export default protectedRoutes;