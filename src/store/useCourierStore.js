import { useRef, useState } from "react";
import { create } from "zustand";
import {
  getCouriers,
  createCourier,
  updateCourier,
  deleteCourier,
  toCourierPayload,
} from "../services/courierService";
import { toEnglishDigits } from "../utils/numberConverter";

export function useCourierFormState(initialData = {}, t, onSubmit) {
  const [formData, setFormData] = useState(() => ({
    fullName: "",
    contactNumber: "",
    email: "",
    vehicleType: "",
    vehicleRegistration: "",
    maxWeightKg: "",
    maxPackages: "",
    shiftStart: "",
    shiftEnd: "",
    homeAddress: "",
    status: "",
    profilePicture: null,
    existingImage: null,
    ...initialData,
  }));
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  const validate = () => {
    const newErrors = {};
    const contact = toEnglishDigits(formData.contactNumber);

    if (!formData.fullName?.trim()) newErrors.fullName = t("fullNameRequired");
    if (!contact?.trim()) newErrors.contactNumber = t("contactRequired");
    else if (!/^\d+$/.test(contact))
      newErrors.contactNumber = t("contactNumeric");
    else if (!/^7\d{8}$/.test(contact))
      newErrors.contactNumber = t("contactLength");
    if (!formData.email?.trim()) newErrors.email = t("emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = t("emailInvalid");
    if (!formData.vehicleType) newErrors.vehicleType = t("vehicleTypeRequired");
    if (!formData.vehicleRegistration?.trim())
      newErrors.vehicleRegistration = t("vehicleRegRequired");
    if (
      formData.shiftStart &&
      formData.shiftEnd &&
      formData.shiftStart >= formData.shiftEnd
    ) {
      newErrors.shiftEnd = t("shiftInvalid");
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData((current) => ({ ...current, [name]: files[0] }));
      return;
    }

    let finalValue = toEnglishDigits(value);

    if (["contactNumber", "maxWeightKg", "maxPackages"].includes(name)) {
      finalValue = finalValue.replace(/\D/g, "");
    }

    if (name === "vehicleRegistration") {
      finalValue = finalValue.replace(/[^a-zA-Z0-9]/g, "");
    }

    setFormData((current) => ({ ...current, [name]: finalValue }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = inputRefs.current[firstErrorKey];
      if (element) element.focus();
      return;
    }

    onSubmit({
      ...formData,
      profilePicture:
        formData.profilePicture instanceof File
          ? formData.profilePicture
          : formData.existingImage || null,
    });
  };

  const setInputRef = (name, element) => {
    inputRefs.current[name] = element;
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setInputRef,
  };
}

export const useCourierStore = create((set, get) => ({
  couriers: [],
  isLoading: false,
  error: null,
  emptyCourierFormData: {
    fullName: "",
    contactNumber: "",
    email: "",
    profilePicture: null,
    vehicleType: "bike",
    vehicleRegistration: "",
    maxWeightKg: 20,
    maxPackages: 10,
    shiftStart: "11:00",
    shiftEnd: "15:00",
    homeAddress: "",
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
      await updateCourier(id, updatedData);
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

  getCourierFormInitialData: (id) => {
    const courier = get().getCourierById(id);

    if (!courier) {
      return null;
    }

    return {
      ...courier,
      existingImage: courier.profilePicture,
    };
  },

  addCourierFromForm: async (formData) => {
    await get().addCourier(toCourierPayload(formData));
  },

  updateCourierFromForm: async (id, formData) => {
    const existingCourier = get().getCourierById(id);
    await get().updateCourier(id, toCourierPayload(formData, existingCourier || {}));
  },
}));
