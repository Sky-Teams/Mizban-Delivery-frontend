import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/admin/Orders";
import OrderForm from "./components/admin/OrderForm";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const rtlLanguages = ["fa", "ps"];

    document.documentElement.dir = rtlLanguages.includes(i18n.language)
      ? "rtl"
      : "ltr";
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: 10000,
        }}
      />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/order/create-order" element={<OrderForm />}></Route>
          <Route path="/orders/edit-order/:id" element={<OrderForm />}></Route>
          <Route
            path="/orders/view-order/:id"
            element={<OrderForm readOnly={true} />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
