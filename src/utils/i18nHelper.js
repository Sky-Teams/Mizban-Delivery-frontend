import i18n from '../i18n';

export const getServerMessage = (errorData, fallback) => {
  if (!errorData) return fallback;
  if (typeof errorData === 'string') return errorData;

  if (errorData.messages) {
    const lang = i18n.language;
    return errorData.messages[lang] || errorData.message || fallback;
  }

  return errorData.message || fallback;
};
