import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { toLocaleDigits } from '../../../utils/numberConverter';
import Input from './Input';

export default function DriverProfile({ formData, handleChange, errors, setRef }) {
  const { t } = useTranslation();
  const lng = i18n.language;
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (formData.profilePicture instanceof File) {
      const url = URL.createObjectURL(formData.profilePicture);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    setPreview(null);
  }, [formData.profilePicture]);

  const imageSrc = preview || formData.profilePicture || null;

  return (
    <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
      <div className="flex shrink-0 flex-col">
        <div className="h-36 w-36 overflow-hidden rounded-full bg-gray-200">
          {imageSrc && <img src={imageSrc} className="h-full w-full object-cover" alt="profile" />}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="mt-3 rounded-lg bg-gray-200 px-4 py-1 text-sm"
        >
          {t('profilePicture')}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          name="profilePicture"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      <div className="w-full flex-1 space-y-6">
        <Input
          label={t('fullName')}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder={t('fullName')}
          ref={(element) => setRef('fullName', element)}
        />

        <Input
          label={t('contactNumber')}
          name="phone"
          value={toLocaleDigits(formData.phone, lng)}
          onChange={handleChange}
          error={errors.phone}
          placeholder={toLocaleDigits('+93700123456', lng)}
          ref={(element) => setRef('phone', element)}
        />

        <Input
          label={t('email')}
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="example@email.com"
          ref={(element) => setRef('email', element)}
        />
      </div>
    </div>
  );
}
