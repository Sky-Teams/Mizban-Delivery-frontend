import { api } from "./api";

export const courierService = {
  getAll: () => api.get("/couriers"),

  create: (data) => api.post("/couriers", data),

  update: (id, data) => api.put(`/couriers/${id}`, data),

  delete: (id) => api.delete(`/couriers/${id}`),
};