import i18n from '../i18n';

export const isRTL = () => {
  const rtlLanguages = ['fa', 'ps'];
  return rtlLanguages.includes(i18n.language);
};

export const getCurrentLang = () => {
  return i18n.language;
};

export const getServerMessage = (errorData, fallback = '') => {
  if (!errorData) return fallback;
  if (typeof errorData === 'string') return errorData;

  if (errorData.messages) {
    const lang = getCurrentLang();
    return errorData.messages[lang] || errorData.message || fallback;
  }

  return errorData.message || fallback;
};
