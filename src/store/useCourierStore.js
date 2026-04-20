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

  fetchCouriers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await getCouriers();
      set({ couriers: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Failed to fetch couriers",
        isLoading: false,
      });
    }
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