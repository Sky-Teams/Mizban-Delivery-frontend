import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Routes, Route } from "react-router-dom";

import CourierList from "./pages/admin/CourierList";
import AddCourier from "./pages/admin/AddCourier";
import EditCourier from "./pages/admin/EditCourier";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow bg-gray-50 p-6">
        <Routes>
          <Route path="/couriers" element={<CourierList />} />
          <Route path="/couriers/add" element={<AddCourier />} />
          <Route path="/couriers/edit/:id" element={<EditCourier />} />

          {/* Default page */}
          <Route
            path="/"
            element={
              <div className="text-center mt-10">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Project Initialized
                </h2>
                <p className="mt-2 text-gray-600">
                  The architecture and styling engine are ready for development.
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
