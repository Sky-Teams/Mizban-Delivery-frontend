import apiClient from "../config/apiClient";
import { handleApiError } from "./handleApiError";

export const signup = async (userData) => {
  try {
    const response = await apiClient
      .post("auth/register", { json: userData })
      .json();
    return response;
  } catch (error) {
    await handleApiError(error);
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient
      .post("auth/login", { json: credentials })
      .json();
    return response;
  } catch (error) {
    await handleApiError(error);
  }
};
