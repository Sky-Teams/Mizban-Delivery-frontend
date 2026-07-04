import React, { useEffect, useRef } from 'react';
import Input from './Input';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { toLocaleDigits } from '../../../utils/numberConverter';

export default function DriverProfile({ formData, handleChange, errors, setRef }) {
  const { t } = useTranslation();
  const lng = i18n.language;
  const fileInputRef = useRef();

  const imageSrc = // because of eslints complains I removed the state inside useEffect
    formData.profilePicture instanceof File
      ? URL.createObjectURL(formData.profilePicture)
      : formData.profilePicture || null;

  useEffect(() => {
    if (formData.profilePicture instanceof File) {
      const url = URL.createObjectURL(formData.profilePicture);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    setPreview(null);
  }, [formData.profilePicture]);

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
          {t('PROFILE_PICTURE')}
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
          label={t('FULL_NAME')}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder={t('FULL_NAME')}
          ref={(element) => setRef('fullName', element)}
        />

        <Input
          label={t('CONTACT_NUMBER')}
          name="phone"
          value={toLocaleDigits(formData.phone, lng)}
          onChange={handleChange}
          error={errors.phone}
          placeholder={toLocaleDigits('+93700123456', lng)}
          ref={(element) => setRef('phone', element)}
        />

        <Input
          label={t('EMAIL')}
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
