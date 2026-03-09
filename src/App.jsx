import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Orders from './pages/admin/Orders';
import { Toaster } from 'react-hot-toast';
import OrderForm from './components/admin/OrderForm';
function App() {
  return (
    <div className='min-h-screen flex flex-col'>
     <Toaster position="top-center" reverseOrder={false} containerStyle={{
          zIndex: 10000,
        }}/>
      <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/orders" element={<Orders/>}></Route>
        <Route path='/order/create-order' element={<OrderForm />}></Route>
        <Route path='/orders/edit-order/:id' element={<OrderForm />}></Route>
        <Route path='/orders/view-order/:id' element={<OrderForm readOnly={true}/>}></Route>
       </Routes>
       <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;