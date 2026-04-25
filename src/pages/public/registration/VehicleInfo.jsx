import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import Dropdown from "../../../components/common/Dropdown";
import { RiMotorbikeFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import useRegistrationStore from "../../../store/useRegistrationStore";

const VehicleInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formData = useRegistrationStore((state) => state.formData);
  const updateSection = useRegistrationStore((state) => state.updateSection);

  const vehicleTypes = [
    { id: 1, name: t("VEHICLE_INFO_TYPES_SEDAN"), value: "Sedan" },
    { id: 2, name: t("VEHICLE_INFO_TYPES_SUV"), value: "SUV" },
    { id: 3, name: t("VEHICLE_INFO_TYPES_TRUCK"), value: "Truck" },
    { id: 4, name: t("VEHICLE_INFO_TYPES_VAN"), value: "Van" },
    { id: 5, name: t("VEHICLE_INFO_TYPES_MOTORCYCLE"), value: "Motorcycle" },
  ];

  const fuelTypes = [
    { id: 1, name: t("VEHICLE_INFO_FUELS_GASOLINE"), value: "Gasoline" },
    { id: 2, name: t("VEHICLE_INFO_FUELS_DIESEL"), value: "Diesel" },
    { id: 3, name: t("VEHICLE_INFO_FUELS_ELECTRIC"), value: "Electric" },
    { id: 4, name: t("VEHICLE_INFO_FUELS_HYBRID"), value: "Hybrid" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection("vehicleInfo", { [name]: value });
  };

  const handleDropdownSelect = (name, val) => {
    updateSection("vehicleInfo", { [name]: val });
  };

  const nextStep = () => navigate("/registration/document-upload");

  return (
    <RegistrationStepWrapper
      title={t("VEHICLE_INFO_TITLE")}
      currentStep={2}
      icon={<RiMotorbikeFill className="text-orange-500 w-8 h-8" />}
    >
      <RegistrationInput
        label={t("VEHICLE_INFO_NAME_MODEL_LABEL")}
        name="nameModel"
        placeholder={t("VEHICLE_INFO_NAME_MODEL_PLACEHOLDER")}
        value={formData.vehicleInfo.nameModel || ""}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t("VEHICLE_INFO_TYPE_LABEL")}
        </label>
        <Dropdown
          options={vehicleTypes}
          placeholder={t("VEHICLE_INFO_TYPE_PLACEHOLDER")}
          value={formData.vehicleInfo.type}
          onSelect={(val) => handleDropdownSelect("type", val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label={t("VEHICLE_INFO_LICENSE_PLATE_LABEL")}
        name="licensePlate"
        placeholder={t("VEHICLE_INFO_LICENSE_PLATE_PLACEHOLDER")}
        value={formData.vehicleInfo.licensePlate || ""}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t("VEHICLE_INFO_FUEL_TYPE_LABEL")}
        </label>
        <Dropdown
          options={fuelTypes}
          placeholder={t("VEHICLE_INFO_FUEL_TYPE_PLACEHOLDER")}
          value={formData.vehicleInfo.fuelType}
          onSelect={(val) => handleDropdownSelect("fuelType", val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label={t("VEHICLE_INFO_COLOR_LABEL")}
        name="color"
        placeholder={t("VEHICLE_INFO_COLOR_PLACEHOLDER")}
        value={formData.vehicleInfo.color || ""}
        onChange={handleChange}
      />

      <StepNavigation onNext={nextStep} onSkip={nextStep} />
    </RegistrationStepWrapper>
  );
};

export default VehicleInfo;
