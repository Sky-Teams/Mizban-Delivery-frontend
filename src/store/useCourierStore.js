import { create } from "zustand";
import {
  getCouriers,
  createCourier,
  updateCourier,
  deleteCourier,
  getCourierById,
} from "../services/courierService";

export const emptyCourierFormData = {
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
};

export const useCourierStore = create((set, get) => ({
  couriers: [],
  isLoading: false,
  error: null,
  emptyCourierFormData,

  //  FETCH LIST

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

  //  CREATE

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

  //  UPDATE

  updateCourier: async (id, updatedData) => {
    try {
      set({ error: null });

      const updated = await updateCourier(id, updatedData);

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

  //  DELETE

  deleteCourier: async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteCourier(id);

      set({
        couriers: get().couriers.filter((c) => c.id !== id),
      });
    } catch (error) {
      set({ error: error.message || "Failed to delete courier" });
    }
  },

  //  SINGLE FETCH

  fetchCourierById: async (id) => {
    const courier = await getCourierById(id);

    set((state) => {
      const exists = state.couriers.some(
        (c) => String(c.id) === String(courier.id),
      );

      return {
        couriers: exists
          ? state.couriers.map((c) =>
              String(c.id) === String(courier.id) ? courier : c,
            )
          : [...state.couriers, courier],
      };
    });

    return courier;
  },

  //  LOCAL GETTER

  getCourierById: (id) =>
    get().couriers.find((courier) => String(courier.id) === String(id)),
}));
