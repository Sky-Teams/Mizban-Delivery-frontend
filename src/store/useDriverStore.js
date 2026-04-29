import { create } from "zustand";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriverById as getDriverByIdApi,
} from "../services/driverService";
import { mapDriverFromApi, mapDriverToApi } from "../services/mapper";

const extractDriverRecord = (response) => response?.data || response || {};

const mergeDriver = (drivers, driver) => {
  const exists = drivers.some((item) => String(item.id) === String(driver.id));

  if (!exists) {
    return [driver, ...drivers];
  }

  return drivers.map((item) =>
    String(item.id) === String(driver.id) ? driver : item,
  );
};

export const useDriverStore = create((set, get) => ({
  drivers: [],
  isLoading: false,
  error: null,

  totalPages: 0,
  currentPage: 1,
  currentLimit: 20,

  fetchDrivers: async (limit, page) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getDrivers(limit, page);

      set({
        drivers: (response.data || []).map(mapDriverFromApi),
        totalPages: response.totalPages || 0,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || "Failed to fetch drivers",
        isLoading: false,
      });
    }
  },

  handleNextButton: () => {
    const { isLoading, currentPage, totalPages } = get();
    if (isLoading || currentPage >= totalPages) return;
    set({ currentPage: currentPage + 1 });
  },

  handlePrevButton: () => {
    const { isLoading, currentPage } = get();
    if (isLoading || currentPage <= 1) return;
    set({ currentPage: currentPage - 1 });
  },

  handlePageNumberClick: (page) => {
    const { isLoading } = get();
    if (isLoading) return;
    set({ currentPage: page });
  },

  updateCurrentLimit: (limit) => {
    set({ currentLimit: limit });
  },

  getDriverById: (id) =>
    get().drivers.find((driver) => String(driver.id) === String(id)) || null,

  addDriver: async (newDriver) => {
    try {
      set({ error: null });

      const response = await createDriver(mapDriverToApi(newDriver));
      const createdDriver = mapDriverFromApi(extractDriverRecord(response));

      set({
        drivers: mergeDriver(get().drivers, createdDriver),
      });

      return createdDriver;
    } catch (error) {
      const message = error.message || "Failed to add driver";
      set({ error: message });
      throw error;
    }
  },

  updateDriver: async (id, updatedData) => {
    try {
      set({ error: null });

      const response = await updateDriver(id, mapDriverToApi(updatedData));
      const updatedDriver = mapDriverFromApi(extractDriverRecord(response));

      set({
        drivers: get().drivers.map((driver) =>
          String(driver.id) === String(id) ? updatedDriver : driver,
        ),
      });

      return updatedDriver;
    } catch (error) {
      const message = error.message || "Failed to update driver";
      set({ error: message });
      throw error;
    }
  },

  deleteDriver: async (id) => {
    try {
      set({ error: null });
      await deleteDriver(id);

      set({
        drivers: get().drivers.filter((driver) => driver.id !== id),
      });
    } catch (error) {
      set({ error: error.message || "Failed to delete driver" });
      throw error;
    }
  },

  fetchDriverById: async (id) => {
    try {
      set({ isLoading: true, error: null });

      const response = await getDriverByIdApi(id);
      const driver = mapDriverFromApi(extractDriverRecord(response));

      set((state) => ({
        isLoading: false,
        drivers: mergeDriver(state.drivers, driver),
      }));

      return driver;
    } catch (error) {
      set({
        error: error.message || "Failed to fetch driver details",
        isLoading: false,
      });
      throw error;
    }
  },
}));
