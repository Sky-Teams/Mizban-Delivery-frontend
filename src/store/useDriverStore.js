import { create } from 'zustand';
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriverById as getDriverByIdApi,
} from '../services/driverService';

export const emptyDriverFormData = {
  fullName: '',
  phone: '',
  email: '',
  profilePicture: null,
  vehicleType: 'bike',
  vehicleRegistrationNumber: '',
  maxWeightKg: 20,
  maxPackages: 10,
  shiftStart: '11:00',
  shiftEnd: '15:00',
  address: '',
  status: 'offline',
};

export const useDriverStore = create((set, get) => ({
  drivers: [],
  isLoading: false,
  error: null,
  emptyDriverFormData,

  // FETCH LIST
  totalPages: 0,
  currentPage: 1,
  currentLimit: 20,

  fetchDrivers: async (limit, page) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getDrivers(limit, page);

      set({
        drivers: response.data,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch drivers',
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

  getDriverById: (id) => get().drivers.find((c) => String(c.id) === String(id)) || null,

  addDriver: async (newDriver) => {
    try {
      set({ error: null });

      const created = await createDriver(newDriver);

      set({
        drivers: [created, ...get().drivers],
      });
    } catch (error) {
      const message = error.message || 'Failed to add driver';
      set({ error: message });
      throw error;
    }
  },

  // UPDATE
  updateDriver: async (id, updatedData) => {
    try {
      set({ error: null });

      const updated = await updateDriver(id, updatedData);

      set({
        drivers: get().drivers.map((c) => (String(c.id) === String(id) ? updated : c)),
      });
    } catch (error) {
      const message = error.message || 'Failed to update driver';
      set({ error: message });
      throw error;
    }
  },

  // DELETE
  deleteDriver: async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await deleteDriver(id);

      set({
        drivers: get().drivers.filter((c) => c.id !== id),
      });
    } catch (error) {
      set({ error: error.message || 'Failed to delete driver' });
    }
  },

  fetchDriverById: async (id) => {
    try {
      set({ isLoading: true, error: null });

      const driver = await getDriverByIdApi(id);

      set((state) => {
        const exists = state.drivers.some((c) => String(c.id) === String(driver.id));

        return {
          isLoading: false,
          drivers: exists
            ? state.drivers.map((c) => (String(c.id) === String(driver.id) ? driver : c))
            : [...state.drivers, driver],
        };
      });

      return driver;
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch driver details',
        isLoading: false,
      });
      throw error;
    }
  },
}));
