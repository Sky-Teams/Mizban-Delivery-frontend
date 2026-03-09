import Header from './components/common/Header';
import Footer from './components/common/Footer';

import AppRouter from './routes/appRouter';
import {Toaster} from 'react-hot-toast';
import Orders from './pages/admin/Orders';
import CreateOrder from "./components/admin/CreateOrder"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" reverseOrder={false} containerStyle={{zIndex:9999}}/>
        <AppRouter/> 
    </div>
  );
}

export default App;