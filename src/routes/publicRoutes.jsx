import Signup from '../pages/public/Signup';
// import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
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
        path:"/access-denied",
        element:<AccessDenied/>
    }
];


export default publicRoutes;