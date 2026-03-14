import axios from "axios";

const API_URL = "http://localhost:3500/couriers";

export const courierService = {
  getAll: () => axios.get(API_URL),

  create: (data) => axios.post(API_URL, data),

  update: (id, data) => axios.put(`${API_URL}/${id}`, data),

  delete: (id) => axios.delete(`${API_URL}/${id}`),
};
