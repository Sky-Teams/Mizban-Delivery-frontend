import Signup from '../pages/public/Signup';
// import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
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