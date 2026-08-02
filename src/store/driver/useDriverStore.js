import { create } from 'zustand';
import {
  getDrivers,
  updateDriver,
  getDriverById as getDriverByIdApi,
  getPendingDrivers,
} from '../../services/driverService';
import { mapDriverFromApi, mapDriverToApi } from '../../utils/mapper';
import { updateRecord } from '../../utils/updateRecord';
import { FaRegHospital } from 'react-icons/fa';

export const useDriverStore = create((set, get) => ({
  drivers: [],
  selectedDriver: null,
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

  getDriverById: (id) => get().drivers.find((driver) => String(driver.id) === String(id)) || null,

  /*
  addDriver: async (newDriver) => {
    set({ isLoading: true, error: null });

    try {
      const response = await createDriver(mapDriverToApi(newDriver));
      const createdDriver = mapDriverFromApi(response.data);

      set((state) => ({
        drivers: [createdDriver, ...state.drivers],
      }));

      return createdDriver;
    } catch (error) {
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  */

  updateDriver: async (id, updatedData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await updateDriver(id, mapDriverToApi(updatedData));
      const updatedDriver = mapDriverFromApi(response.data);

      set((state) => ({
        drivers: updateRecord(state.drivers, id, updatedDriver),
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
      set((state) => ({
        drivers: state.drivers.filter((driver) => String(driver.id) !== String(id)),
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
      set({
        isLoading: true,
        error: null,
      });

      const response = await getDriverByIdApi(id);
      const driver = mapDriverFromApi(response.data);
      const driverNotMapped = response.data;

      set((state) => ({
        selectedDriver: driverNotMapped,

        drivers: state.drivers.some((item) => String(item.id) === String(driver.id))
          ? state.drivers
          : [driver, ...state.drivers],
      }));

      return driver;
    } catch (error) {
      set({
        error,
        selectedDriver: null,
      });

      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  pendignDrivers: [],
  totalDrivers: 0,

  fetchPendingDriver: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await getPendingDrivers();

      const drivers = response?.data ?? [];
      const totalDrivers = response?.totalDrivers ?? 0;

      set({
        pendingDrivers: drivers,
        totalDrivers,
      });

      return {
        drivers,
        totalDrivers,
      };
    } catch (error) {
      console.error('FETCH PENDING DRIVERS ERROR:', error);

      set({
        error,
        pendingDrivers: [],
        totalDrivers: 0,
      });

      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
