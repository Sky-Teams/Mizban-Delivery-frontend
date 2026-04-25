import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCourierForm } from '../../hooks/useCourierForm';
import { DRIVER_STATUS, VEHICLE_TYPES } from '../../utils/types';
import { toLocaleDigits } from '../../utils/numberConverter';
import i18n from '../../i18n';

// Shared & External Components
import Input from '../common/Courier/Input';
import Select from '../common/Courier/Select';
import CourierProfile from '../common/Courier/CourierProfile'; // Kept separate due to complexity

// INTERNAL SUB-COMPONENTS

const CourierVehicle = ({ formData, handleChange, errors, setRef, t }) => (
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
          label: t(type),
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

const CourierCapacity = ({ formData, handleChange, t }) => {
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

const CourierAvailability = ({ formData, handleChange, errors, setRef, t }) => (
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

const CourierAddress = ({ formData, handleChange, t }) => (
  <div className="space-y-6">
    <div>
      <label className="text-sm text-gray-600 font-medium">
        {t('homeAddress')}
      </label>
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

const CourierDropdown = ({ formData, handleChange, t }) => (
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
      {isSubmitting
        ? t('Loading...')
        : isEdit
          ? t('updateCourier')
          : t('saveCourier')}
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

export default function CourierForm({
  initialData = {},
  onSubmit,
  isEdit = false,
  isSubmitting = false,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, errors, handleChange, handleSubmit, setInputRef } =
    useCourierForm(initialData, t, onSubmit);
  console.log(formData, 'form-----------');

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="bg-white rounded-2xl shadow-md p-8 space-y-10"
    >
      <fieldset
        disabled={isSubmitting}
        className="space-y-10 disabled:opacity-75"
      >
        {/* Profile Section (Kept as separate file) */}
        <CourierProfile
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setRef={setInputRef}
        />

        <div className="border-t border-gray-100 pt-8">
          <CourierVehicle
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            setRef={setInputRef}
            t={t}
          />
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-semibold mb-6">
            {t('Capacity & Availability')}
          </h2>
          <div className="space-y-8">
            <CourierCapacity
              formData={formData}
              handleChange={handleChange}
              t={t}
            />
            <CourierAvailability
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              setRef={setInputRef}
              t={t}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <CourierAddress
            formData={formData}
            handleChange={handleChange}
            t={t}
          />
        </div>
        <div className="border-t border-gray-100 pt-8">
          <CourierDropdown
            formData={formData}
            handleChange={handleChange}
            t={t}
          />
        </div>

        <FormButtons
          navigate={navigate}
          isEdit={isEdit}
          isSubmitting={isSubmitting}
          t={t}
        />
      </fieldset>
    </form>
  );
}
