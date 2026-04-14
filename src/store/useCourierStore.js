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

  // Fetch

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

  // Create

  addCourier: async (newCourier) => {
    try {
      set({ error: null });

      const created = await createCourier(newCourier);

      set({
        couriers: [created, ...get().couriers],
      });
    } catch (error) {
      const message = error.message || "Failed to add courier";
      set({ error: message });
      throw error;
    }
  },

  // Update

  updateCourier: async (id, updatedData) => {
    try {
      set({ error: null });

      const updated = await updateCourier(id, updatedData);

      // ✅ Update only the changed item
      set({
        couriers: get().couriers.map((c) =>
          String(c.id) === String(id) ? updated : c,
        ),
      });
    } catch (error) {
      const message = error.message || "Failed to update courier";
      set({ error: message });
      throw error;
    }
  },

  //  Delete

  deleteCourier: async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteCourier(id);

      // ✅ Remove locally (no refetch)
      set({
        couriers: get().couriers.filter((c) => c.id !== id),
      });
    } catch (error) {
      set({ error: error.message || "Failed to delete courier" });
    }
  },

  //  Helpers

  getCourierById: (id) =>
    get().couriers.find((courier) => String(courier.id) === String(id)),
}));
