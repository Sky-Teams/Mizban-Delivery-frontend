import api from "./api";

export const getCouriers = async () => {
  try {
    return await api.get("drivers?limit=8&page=1").json();
  } catch (error) {
    throw new Error("Failed to fetch drivers");
  }
};

export const createCourier = async (data) => {
  try {
    return await api.post("drivers", { json: data }).json();
  } catch (error) {
    throw new Error("Failed to create driver");
  }
};

export const updateCourier = async (id, data) => {
  try {
    return await api.put(`drivers/${id}`, { json: data }).json();
  } catch (error) {
    throw new Error("Failed to update driver");
  }
};

export const deleteCourier = async (id) => {
  try {
    return await api.delete(`couriers/${id}`).json();
  } catch (error) {
    throw new Error("Failed to delete courier");
  }
};
