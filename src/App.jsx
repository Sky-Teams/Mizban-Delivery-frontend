import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Orders from './pages/admin/Orders';
import CreateOrder from "./components/admin/CreateOrder"
function App() {
  return (
    <div className="flex flex-col min-h-screen">
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