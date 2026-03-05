import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Orders from './pages/admin/Orders';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
      <Header />
       <Routes>
        <Route path="/orders" element={<Orders/>}></Route>
       </Routes>
       <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;