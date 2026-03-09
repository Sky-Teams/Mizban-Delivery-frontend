import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Orders from './pages/admin/Orders';
import CreateOrder from "./components/admin/CreateOrder"
import { Toaster } from 'react-hot-toast';
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
        <Route path='/order/create-order' element={<CreateOrder />}></Route>
        <Route path='/orders/edit-order/:id' element={<CreateOrder />}></Route>
        <Route path='/orders/view-order/:id' element={<CreateOrder readOnly={true}/>}></Route>
       </Routes>
       <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;