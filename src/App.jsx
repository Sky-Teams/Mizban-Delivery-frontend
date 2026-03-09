import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import CourierList from "./pages/admin/CourierList";
import AddCourier from "./pages/admin/AddCourier";
import EditCourier from "./pages/admin/EditCourier";

import Orders from "./pages/admin/Orders";
import CreateOrder from "./components/admin/CreateOrder";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ zIndex: 10000 }}
      />

      <Header />

      <main className="grow bg-gray-50 p-6">
        <Routes>
          <Route path="/couriers" element={<CourierList />} />
          <Route path="/couriers/add" element={<AddCourier />} />
          <Route path="/couriers/edit/:id" element={<EditCourier />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/create-order" element={<CreateOrder />} />

          <Route
            path="/"
            element={
              <div className="text-center mt-10">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Project Initialized
                </h2>
                <p className="mt-2 text-gray-600">
                  The architecture and styling engine are ready.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
