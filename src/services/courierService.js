import ky from "ky";

const API_URL = "http://localhost:3500/couriers";

export const courierService = {
  getAll: () => ky.get(API_URL).json(),

  create: (data) => ky.post(API_URL, { json: data }).json(),

  update: (id, data) => ky.put(`${API_URL}/${id}`, { json: data }).json(),

  delete: (id) => ky.delete(`${API_URL}/${id}`).json(),
};
