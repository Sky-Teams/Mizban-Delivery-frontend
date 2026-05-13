import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDriverForm } from '../../hooks/useDriverForm';
import { DRIVER_STATUS, VEHICLE_TYPES } from '../../utils/types';
import { toLocaleDigits } from '../../utils/numberConverter';
import i18n from '../../i18n';
import Input from '../common/Driver/Input';
import Select from '../common/Driver/Select';
import DriverProfile from '../common/Driver/DriverProfile';

const DriverVehicle = ({ formData, handleChange, errors, setRef, t }) => (
  <>
    <h2 className="text-xl font-semibold">{t('vehicleInfo')}</h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Select
        label={t('vehicleType')}
        name="vehicleType"
        value={formData.vehicleType}
        onChange={handleChange}
        options={Object.values(VEHICLE_TYPES).map((type) => ({
          value: type,
          label: t(type.toLocaleUpperCase()),
        }))}
        error={errors.vehicleType}
        ref={(element) => setRef('vehicleType', element)}
      />
      <Input
        label={t('vehicleRegistration')}
        name="vehicleRegistrationNumber"
        value={formData.vehicleRegistrationNumber}
        onChange={handleChange}
        error={errors.vehicleRegistrationNumber}
        placeholder="HR-4502312"
        ref={(element) => setRef('vehicleRegistrationNumber', element)}
      />
    </div>
  </>
);

const DriverCapacity = ({ formData, handleChange, t }) => {
  const lng = i18n.language;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Input
        label={t('maxWeight')}
        name="maxWeightKg"
        type="number"
        min="0"
        step="1"
        value={formData.maxWeightKg}
        onChange={handleChange}
        placeholder={toLocaleDigits('50', lng)}
      />
      <Input
        label={t('maxPackages')}
        name="maxPackages"
        type="number"
        min="0"
        step="1"
        value={formData.maxPackages}
        onChange={handleChange}
        placeholder={toLocaleDigits('10', lng)}
      />
    </div>
  );
};

const DriverAvailability = ({ formData, handleChange, errors, setRef, t }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <Input
      label={t('shiftStart')}
      name="shiftStart"
      type="time"
      value={formData.shiftStart}
      onChange={handleChange}
    />
    <Input
      label={t('shiftEnd')}
      name="shiftEnd"
      type="time"
      value={formData.shiftEnd}
      onChange={handleChange}
      error={errors.shiftEnd}
      ref={(element) => setRef('shiftEnd', element)}
    />
  </div>
);

const DriverAddress = ({ formData, handleChange, t }) => (
  <div className="space-y-6">
    <div>
      <label className="text-sm font-medium text-gray-600">{t('homeAddress')}</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder={t('homeAddress')}
        className="mt-2 w-full rounded-xl border p-2 outline-none transition-all focus:ring-2 focus:ring-orange-500"
        rows="3"
      />
    </div>
  </div>
);

const DriverStatusField = ({ formData, handleChange, t }) => (
  <Select
    label={t('status')}
    name="status"
    value={formData.status}
    onChange={handleChange}
    options={Object.values(DRIVER_STATUS).map((status) => ({
      value: status,
      label: t(status),
    }))}
  />
);

const FormButtons = ({ navigate, isSubmitting, t }) => (
  <div className="flex gap-4 pt-4">
    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded-xl bg-orange-500 px-8 py-2.5 font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? t('Loading...') : t('updateDriver')}
    </button>
    <button
      type="button"
      disabled={isSubmitting}
      onClick={() => navigate(-1)}
      className="rounded-xl bg-gray-100 px-8 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {t('cancel')}
    </button>
  </div>
);

export default function DriverForm({ initialData, onSubmit, isSubmitting = false }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, errors, handleChange, handleSubmit, setInputRef } = useDriverForm(
    initialData,
    onSubmit,
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="space-y-10 rounded-2xl bg-white p-8 shadow-md"
    >
      <fieldset disabled={isSubmitting} className="space-y-10 disabled:opacity-75">
        <DriverProfile
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setRef={setInputRef}
        />

        <div className="border-t border-gray-100 pt-8">
          <DriverVehicle
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            setRef={setInputRef}
            t={t}
          />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h2 className="mb-6 text-xl font-semibold">{t('Capacity & Availability')}</h2>
          <div className="space-y-8">
            <DriverCapacity formData={formData} handleChange={handleChange} t={t} />
            <DriverAvailability
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              setRef={setInputRef}
              t={t}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <DriverAddress formData={formData} handleChange={handleChange} t={t} />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <DriverStatusField formData={formData} handleChange={handleChange} t={t} />
        </div>

        <FormButtons navigate={navigate} isSubmitting={isSubmitting} t={t} />
      </fieldset>
    </form>
  );
}
