import { Toaster } from "react-hot-toast";
import AppLayout from "./layout/AppLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ zIndex: 10000 }}
      />
      <AppRoutes />
    </>
  )
}

export default App; 
