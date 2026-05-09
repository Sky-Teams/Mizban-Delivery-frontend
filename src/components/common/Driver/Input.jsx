import React from 'react';
import { useTranslation } from 'react-i18next';

const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input ref={ref} {...props} className="w-full border rounded-xl p-2 mt-2" />
      {error && <p className="text-red-500 text-xs mt-1">{t(error, { defaultValue: error })}</p>}
    </div>
  );
});

export default Input;
