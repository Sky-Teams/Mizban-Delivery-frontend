import React from 'react';
import { useTranslation } from 'react-i18next';

const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input ref={ref} {...props} className="mt-2 w-full rounded-xl border p-2" />
      {error && <p className="mt-1 text-xs text-red-500">{t(error, { defaultValue: error })}</p>}
    </div>
  );
});

export default Input;
