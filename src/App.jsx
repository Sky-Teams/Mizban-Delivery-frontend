import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Orders from './pages/admin/Orders';
import CreateOrder from "./components/admin/CreateOrder"
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
     <Toaster position="top-center" reverseOrder={false} containerStyle={{
          zIndex: 10000,
        }}/>
      <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path='/create-order' element={<CreateOrder />}></Route>
       </Routes>
       <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;