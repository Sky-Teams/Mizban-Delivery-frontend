import ky from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:3500",
});

export const getCouriers = async () => {
  try {
    return await api.get("couriers").json();
  } catch (error) {
    throw new Error("Failed to fetch couriers");
  }
};

export const createCourier = async (data) => {
  try {
    return await api.post("couriers", { json: data }).json();
  } catch (error) {
    throw new Error("Failed to create courier");
  }
};

export const updateCourier = async (id, data) => {
  try {
    return await api.put(`couriers/${id}`, { json: data }).json();
  } catch (error) {
    throw new Error("Failed to update courier");
  }
};

export const deleteCourier = async (id) => {
  try {
    return await api.delete(`couriers/${id}`).json();
  } catch (error) {
    throw new Error("Failed to delete courier");
  }
};
