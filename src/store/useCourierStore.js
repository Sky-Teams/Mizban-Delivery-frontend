import { create } from "zustand";
import { courierService } from "../services/courierService";

export const useCourierStore = create((set, get) => ({
  couriers: [],
  isLoading: false,
  error: null,

  fetchCouriers: async () => {
    set({ isLoading: true });
    try {
      const response = await courierService.getAll();
      set({ couriers: response.data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch couriers", isLoading: false });
    }
  },

  addCourier: async (newCourier) => {
    await courierService.create(newCourier);
    await get().fetchCouriers();
  },

  updateCourier: async (id, updatedData) => {
    await courierService.update(id, updatedData);
    await get().fetchCouriers();
  },

  deleteCourier: async (id) => {
    if (window.confirm("Are you sure?")) {
      await courierService.delete(id);
      set({ couriers: get().couriers.filter((c) => c.id !== id) });
    }
  },

  addCourierAndNavigate: async (newCourier) => {
    await get().addCourier(newCourier);
  },

  updateCourierAndNavigate: async (id, updatedData) => {
    await get().updateCourier(id, updatedData);
  },
}));
