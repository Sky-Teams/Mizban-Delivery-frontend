import { createContext, useState, useEffect } from "react";
export const CourierContext = createContext();

export function CourierProvider({ children }) {
  const API_URL = "http://localhost:3500/couriers";
  const [couriers, setCouriers] = useState([]);
  const fetchCouriers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCouriers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  const deleteCourier = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this courier?",
      )
    ) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        /* 
      FUTURE: Soft Delete (with real backend)
      await fetch(`${API_URL}/${id}`, { 
        method: "PATCH", 
        body: JSON.stringify({ isDeleted: true, status: "Inactive" }) 
      }); 
      */

        fetchCouriers();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <CourierContext.Provider value={{ couriers, fetchCouriers, deleteCourier }}>
      {children}
    </CourierContext.Provider>
  );
}
