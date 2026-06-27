import apiClient from '../config/apiClient';
import { handleApiError } from './handleApiError';
import useAuthStore from '../store/useAuthStore';
import ky from 'ky';


export const signup = async (userData) => {
  try {
    const response = await apiClient.post('auth/register', { json: userData }).json();
    return response;
  } catch (error) {
    await handleApiError(error);
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('auth/login', { json: credentials }).json();
    return response;
  } catch (error) {
    await handleApiError(error);
  }
};

export const logout = async (deviceId) => {
  try {
    const response = await apiClient.post('auth/logout', { json: { deviceId } }).json();

    return response;
  } catch (error) {
    await handleApiError(error);
  }
};

export const resetPasswordSendRequest = async (email) => {
  try {
    const response = await apiClient.post('auth/forgot-password', { json: { email } }).json();
    return response;
  } catch (err) {
    await handleApiError(err);
  }
};

export const resetPassword = async (resetToken, newPassword, confirmPassword) => {
  try {
    const response = await apiClient
      .post(`auth/reset-password/${resetToken}`, { json: { newPassword, confirmPassword } })
      .json();

    return response;
  } catch (error) {
    await handleApiError(error);
  }
};
export const verifyUser = async (verificationToken) => {
  try {
    const response = await ky 
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-email/${verificationToken}`)
      .json();

    console.log(response)
    return response;
  } catch (error) {
    throw await handleApiError(error)
  }
};
