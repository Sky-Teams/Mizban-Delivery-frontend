import React, { useEffect, useRef } from 'react';
import Input from './Input';
import { useTranslation } from 'react-i18next';
import { toLocaleDigits } from '../../../utils/numberConverter';
import i18n from '../../../i18n';

export default function DriverProfile({ formData, handleChange, errors, setRef }) {
  const { t } = useTranslation();
  const lng = i18n.language;
  const fileInputRef = useRef();

  const imageSrc = // because of eslints complains I removed the state inside useEffect
    formData.profilePicture instanceof File
      ? URL.createObjectURL(formData.profilePicture)
      : formData.profilePicture || null;

  useEffect(() => {
    return () => {
      if (formData.profilePicture instanceof File) {
        URL.revokeObjectURL(formData.profilePicture);
      }
    };
  }, [formData.profilePicture]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
      <div className="shrink-0 flex flex-col">
        <div className="w-36 h-36 bg-gray-200 rounded-full overflow-hidden">
          {imageSrc && <img src={imageSrc} className="w-full h-full object-cover" alt="profile" />}
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="mt-3 bg-gray-200 px-4 py-1 rounded-lg text-sm"
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

      <div className="flex-1 space-y-6 w-full">
        <Input
          label={t('fullName')}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder={t('fullName')}
          ref={(el) => setRef('fullName', el)}
        />

        <Input
          label={t('contactNumber')}
          name="phone"
          value={toLocaleDigits(formData.phone, lng)}
          onChange={handleChange}
          error={errors.phone}
          placeholder={toLocaleDigits('+93700123456', lng)}
          ref={(el) => setRef('phone', el)}
        />

        <Input
          label={t('email')}
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="example@email.com"
          ref={(el) => setRef('email', el)}
        />
      </div>
    </div>
  );
}
