import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDriverForm } from '../../hooks/useDriverForm';
import { DRIVER_STATUS, VEHICLE_TYPES } from '../../utils/types';
import { toLocaleDigits } from '../../utils/numberConverter';
import i18n from '../../i18n';

// Shared & External Components
import Input from '../common/Driver/Input';
import Select from '../common/Driver/Select';
import DriverProfile from '../common/Driver/DriverProfile'; // Kept separate due to complexity

// INTERNAL SUB-COMPONENTS

const DriverVehicle = ({ formData, handleChange, errors, setRef, t }) => (
  <>
    <h2 className="text-xl font-semibold">{t('vehicleInfo')}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        ref={(el) => setRef('vehicleType', el)}
      />
      <Input
        label={t('vehicleRegistration')}
        name="vehicleRegistrationNumber"
        value={formData.vehicleRegistrationNumber}
        onChange={handleChange}
        error={errors.vehicleRegistrationNumber}
        placeholder="HR-4502312"
        ref={(el) => setRef('vehicleRegistrationNumber', el)}
      />
    </div>
  </>
);

const DriverCapacity = ({ formData, handleChange, t }) => {
  const lng = i18n.language;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      ref={(el) => setRef('shiftEnd', el)}
    />
  </div>
);

const DriverAddress = ({ formData, handleChange, t }) => (
  <div className="space-y-6">
    <div>
      <label className="text-sm text-gray-600 font-medium">{t('homeAddress')}</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder={t('homeAddress')}
        className="w-full border rounded-xl p-2 mt-2 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
        rows="3"
      />
    </div>
  </div>
);

const DriverDropdown = ({ formData, handleChange, t }) => (
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

const FormButtons = ({ navigate, isEdit, isSubmitting, t }) => (
  <div className="flex gap-4 pt-4">
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-orange-500 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? t('Loading...') : isEdit ? t('updateDriver') : t('saveDriver')}
    </button>
    <button
      type="button"
      disabled={isSubmitting}
      onClick={() => navigate(-1)}
      className="bg-gray-100 text-gray-700 px-8 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
    >
      {t('cancel')}
    </button>
  </div>
);

// MAIN COMPONENT

export default function DriverForm({
  initialData = {},
  onSubmit,
  isEdit = false,
  isSubmitting = false,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, errors, handleChange, handleSubmit, setInputRef } = useDriverForm(
    initialData,
    t,
    onSubmit,
  );
  console.log(formData, 'form-----------');

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="bg-white rounded-2xl shadow-md p-8 space-y-10"
    >
      <fieldset disabled={isSubmitting} className="space-y-10 disabled:opacity-75">
        {/* Profile Section (Kept as separate file) */}
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
          <h2 className="text-xl font-semibold mb-6">{t('Capacity & Availability')}</h2>
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
          <DriverDropdown formData={formData} handleChange={handleChange} t={t} />
        </div>

        <FormButtons navigate={navigate} isEdit={isEdit} isSubmitting={isSubmitting} t={t} />
      </fieldset>
    </form>
  );
}
