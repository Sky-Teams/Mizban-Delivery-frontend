import { create } from "zustand";
import {
  getCouriers,
  createCourier,
  updateCourier,
  deleteCourier,
} from "../services/courierService";

export const useCourierStore = create((set, get) => ({
  couriers: [],
  isLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  currentLimit: 20,

  fetchCouriers: async (limit, page) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCouriers(limit, page);
      set({ couriers: response.data,
        totalPages: response.totalPages,
        isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Failed to fetch couriers",
        isLoading: false,
      });
    }
  },
 handleNextButton :()=>{
  const{isLoading, currentPage, totalPages} = get()
     if(isLoading || currentPage>= totalPages) return
     set({currentPage: currentPage + 1})  
 },
 handlePrevButton: ()=>{
     const{isLoading, currentPage} = get()
     if(isLoading || currentPage <=  1) return
     set({currentPage: currentPage - 1})
 },
 handlePageNumberClick : (page)=>{
    const {isLoading} = get()
    if(isLoading ) return
    set({currentPage: page})
 },
 updateCurrentLimit: (limit)=>{
   set({currentLimit: limit})
 },
  addCourier: async (newCourier) => {
    try {
      await createCourier(newCourier);
      await get().fetchCouriers();
    } catch (error) {
      set({ error: error.message || "Failed to add courier" });
    }
  },

  updateCourier: async (id, updatedData) => {
    try {
      await updateCourier(id, updatedData);
      await get().fetchCouriers();
    } catch (error) {
      set({ error: error.message || "Failed to update courier" });
    }
  },

  deleteCourier: async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteCourier(id);
        set({
          couriers: get().couriers.filter((c) => c.id !== id),
        });
      } catch (error) {
        set({ error: error.message || "Failed to delete courier" });
      }
    }
  },

  addCourierAndNavigate: async (newCourier) => {
    await get().addCourier(newCourier);
  },

  updateCourierAndNavigate: async (id, updatedData) => {
    await get().updateCourier(id, updatedData);
  },
}));