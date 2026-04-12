import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCourierForm } from "../../hooks/useCourierForm";
import CourierProfile from "../common/Courier/CourierProfile";
import CourierVehicle from "../common/Courier/CourierVehicle";
import CourierCapacity from "../common/Courier/CourierCapacity";
import CourierAvailability from "../common/Courier/CourierAvailability";
import CourierAddress from "../common/Courier/CourierAddress";
import FormButtons from "../common/Courier/FormButtons";

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

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="bg-white rounded-2xl shadow-md p-8 space-y-8"
    >
      <fieldset disabled={isSubmitting} className="space-y-8 disabled:opacity-70">
        <CourierProfile
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setRef={setInputRef}
        />
        <CourierVehicle
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setRef={setInputRef}
        />
        <CourierCapacity formData={formData} handleChange={handleChange} />
        <CourierAvailability
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setRef={setInputRef}
        />
        <CourierAddress formData={formData} handleChange={handleChange} />
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
