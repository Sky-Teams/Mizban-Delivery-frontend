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
  emptyCourierFormData: {
    fullName: "",
    phone: "",
    email: "",
    profilePicture: null,
    vehicleType: "bike",
    vehicleRegistrationNumber: "",
    maxWeightKg: 20,
    maxPackages: 10,
    shiftStart: "11:00",
    shiftEnd: "15:00",
    address: "",
    status: "offline",
  },

  fetchCouriers: async () => {
    set({ isLoading: true, error: null });

    try {
      const couriers = await getCouriers();
      set({ couriers, isLoading: false });
    } catch (error) {
      set({
        error: error.message || "Failed to fetch couriers",
        isLoading: false,
      });
    }
  },

  addCourier: async (newCourier) => {
    try {
      set({ error: null });
      await createCourier(newCourier);
      await get().fetchCouriers();
    } catch (error) {
      const message = error.message || "Failed to add courier";
      set({ error: message });
      throw error;
    }
  },

  updateCourier: async (id, updatedData) => {
    try {
      set({ error: null });
      const existingCourier = get().getCourierById(id);
      await updateCourier(id, updatedData, existingCourier || {});
      await get().fetchCouriers();
    } catch (error) {
      const message = error.message || "Failed to update courier";
      set({ error: message });
      throw error;
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

  getCourierById: (id) =>
    get().couriers.find((courier) => String(courier.id) === String(id)),
}));
