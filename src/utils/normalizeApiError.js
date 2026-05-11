import { getServerMessage } from './i18nHelper';

export const normalizeApiError = async (error, fallback) => {
  try {
    const data = await error?.response?.json();

    return {
      ...data,
      message: getServerMessage(data, data?.error || fallback),
      status: error?.response?.status ?? null,
      cause: error,
    };
  } catch {
    return {
      message: error?.message || fallback,
      status: error?.response?.status ?? null,
      cause: error,
    };
  }
};
