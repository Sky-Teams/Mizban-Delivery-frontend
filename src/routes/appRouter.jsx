import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function AppRouter(){
    const allRoutes=[...publicRoutes , ...protectedRoutes];
    const location=useLocation();
    const hideHeaderContent=location.pathname==='/signup';

    return (
        <>
        <Header hideContent={hideHeaderContent}/>
        <main className="flex-grow flex items-center justify-center bg-gray-50">
           <Routes>
               {
                   allRoutes.map((route,index) => (
                       <Route key={index} path={route.path} element={route.element}/>
                    ))
                }                
           </Routes>
        </main>
           <Footer/>
        </>
    )
}

export default AppRouter;