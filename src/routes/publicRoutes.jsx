import Signup from '../pages/public/auth/Signup';
import Home from '../pages/public/Home';
import Login from '../pages/public/auth/Login';
const publicRoutes=[
    {
        path:"/",
        element:<Home/>
    },
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