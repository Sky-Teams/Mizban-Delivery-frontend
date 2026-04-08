import Signup from '../pages/public/auth/Signup';
import Login from '../pages/public/auth/Login';
const publicRoutes=[
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    }
];


export default publicRoutes;