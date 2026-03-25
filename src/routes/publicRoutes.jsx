import Signup from '../pages/public/Signup';
import Home from '../pages/public/Home';
const publicRoutes=[
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/signup",
        element:<Signup/>
    }
];


export default publicRoutes;