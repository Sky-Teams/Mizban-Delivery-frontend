import { create } from 'zustand';
import { produce } from 'immer';
import { registrationService } from '../services/driverRegistrationService';

const createInitialFormData = () => ({
  personalInfo: {
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    address: '',
  },
  vehicleInfo: {
    nameModel: '',
    type: '',
    licensePlate: '',
    fuelType: '',
    color: '',
  },
  documents: {
    driverPicture: null,
    idFront: null,
    idBack: null,
    license: null,
    vehicleCard: null,
  },
  additionalInfo: {
    emergencyContact: '',
    relationship: '',
  },
  status: 'idle',
});

const useRegistrationStore = create((set, get) => ({
  formData: createInitialFormData(),

  updateSection: (section, data) =>
    set(
      produce((state) => {
        Object.assign(state.formData[section], data);
      }),
    ),

  resetRegistration: () => set({ formData: createInitialFormData() }),

  submitRegistration: async () => {
    set(
      produce((state) => {
        state.formData.status = 'submitting';
      }),
    );

    try {
      const { formData } = get();
      await registrationService.submit(formData);

      set(
        produce((state) => {
          state.formData.status = 'success';
        }),
      );
      return true;
    } catch (error) {
      set(
        produce((state) => {
          state.formData.status = 'error';
        }),
      );
      console.error('Submission failed:', error);
      return false;
    }
  },
}));

export default useRegistrationStore;
