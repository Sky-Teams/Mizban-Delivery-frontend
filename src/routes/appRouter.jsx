import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CheckPermission from '../utils/CheckPermission';

function AppRouter(){
    const allRoutes=[...publicRoutes , ...protectedRoutes];
    const location=useLocation();
    const hiddenRoutes=["/signup","/login"];
    const hideHeaderContent=hiddenRoutes.includes(location.pathname);

    return (
        <>
        <Header hideContent={hideHeaderContent}/>
        <main className="grow bg-gray-50 p-6">
           <Routes>
               {
                   allRoutes.map((route,index) => (
                       <Route key={index} path={route.path} element={
                        <CheckPermission requiredPermission={route.requiredPermission}> {route.element} </CheckPermission>
                       }/>
                    ))
                }                
           </Routes>
        </main>
           <Footer/>
        </>
    )
}

export default AppRouter;