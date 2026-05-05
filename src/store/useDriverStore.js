import { create } from "zustand";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver as deleteDriverApi,
  getDriverById as getDriverByIdApi,
} from "../services/driverService";
import { mapDriverFromApi, mapDriverToApi } from "../utils/mapper";
import {
  mergeDriver,
  removeDriverById,
  replaceDriver,
} from "./driverStore.helpers";

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
      });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
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
    set({ isLoading: true, error: null });

    try {
      const response = await createDriver(mapDriverToApi(newDriver));
      const createdDriver = mapDriverFromApi(response.data);

      set((state) => ({
        drivers: mergeDriver(state.drivers, createdDriver),
      }));

      return createdDriver;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateDriver: async (id, updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await updateDriver(id, mapDriverToApi(updatedData));
      const updatedDriver = mapDriverFromApi(response.data);

      set((state) => ({
        drivers: replaceDriver(state.drivers, id, updatedDriver),
      }));

      return updatedDriver;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDriver: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await deleteDriverApi(id);

      set((state) => ({
        drivers: removeDriverById(state.drivers, id),
      }));
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDriverById: async (id) => {
    try {
      set({ isLoading: true, error: null });

      const response = await getDriverByIdApi(id);
      const driver = mapDriverFromApi(response.data);

      set((state) => ({
        drivers: mergeDriver(state.drivers, driver),
      }));

      return driver;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
