import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import Dropdown from "../../../components/common/Dropdown";
import { LuCarFront } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import useRegistrationStore from "../../../store/useRegistrationStore";

const VehicleInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formData = useRegistrationStore((state) => state.formData);
  const updateSection = useRegistrationStore((state) => state.updateSection);

  const vehicleTypes = [
    { id: 1, name: t("vehicle_info.types.sedan"), value: "Sedan" },
    { id: 2, name: t("vehicle_info.types.suv"), value: "SUV" },
    { id: 3, name: t("vehicle_info.types.truck"), value: "Truck" },
    { id: 4, name: t("vehicle_info.types.van"), value: "Van" },
    { id: 5, name: t("vehicle_info.types.motorcycle"), value: "Motorcycle" },
  ];

  const fuelTypes = [
    { id: 1, name: t("vehicle_info.fuels.gasoline"), value: "Gasoline" },
    { id: 2, name: t("vehicle_info.fuels.diesel"), value: "Diesel" },
    { id: 3, name: t("vehicle_info.fuels.electric"), value: "Electric" },
    { id: 4, name: t("vehicle_info.fuels.hybrid"), value: "Hybrid" },
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
      title={t("vehicle_info.title")}
      currentStep={2}
      icon={<LuCarFront className="text-orange-500 w-8 h-8" />}
    >
      <RegistrationInput
        label={t("vehicle_info.name_model_label")}
        name="nameModel"
        placeholder={t("vehicle_info.name_model_placeholder")}
        value={formData.vehicleInfo.nameModel || ""}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t("vehicle_info.type_label")}
        </label>
        <Dropdown
          options={vehicleTypes}
          placeholder={t("vehicle_info.type_placeholder")}
          value={formData.vehicleInfo.type}
          onSelect={(val) => handleDropdownSelect("type", val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label={t("vehicle_info.license_plate_label")}
        name="licensePlate"
        placeholder={t("vehicle_info.license_plate_placeholder")}
        value={formData.vehicleInfo.licensePlate || ""}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t("vehicle_info.fuel_type_label")}
        </label>
        <Dropdown
          options={fuelTypes}
          placeholder={t("vehicle_info.fuel_type_placeholder")}
          value={formData.vehicleInfo.fuelType}
          onSelect={(val) => handleDropdownSelect("fuelType", val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label={t("vehicle_info.color_label")}
        name="color"
        placeholder={t("vehicle_info.color_placeholder")}
        value={formData.vehicleInfo.color || ""}
        onChange={handleChange}
      />

      <StepNavigation onNext={nextStep} onSkip={nextStep} />
    </RegistrationStepWrapper>
  );
};

export default VehicleInfo;
