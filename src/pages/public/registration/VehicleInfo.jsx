import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../../context/RegistrationContext";
import RegistrationStepWrapper from "../../../components/common/registration/RegistrationStepWrapper";
import { RegistrationInput } from "../../../components/common/registration/RegistrationInputs";
import StepNavigation from "../../../components/common/registration/StepNavigation";
import Dropdown from "../../../components/common/Dropdown";
import { CarFront } from "lucide-react";

const VehicleInfo = () => {
  const navigate = useNavigate();
  const { formData, updateSection } = useRegistration();

  // Your dropdown needs a .name property and an .id for the key
  const vehicleTypes = [
    { id: 1, name: "Sedan", value: "Sedan" },
    { id: 2, name: "SUV", value: "SUV" },
    { id: 3, name: "Truck", value: "Truck" },
    { id: 4, name: "Van", value: "Van" },
    { id: 5, name: "Motorcycle", value: "Motorcycle" },
  ];

  const fuelTypes = [
    { id: 1, name: "Gasoline", value: "Gasoline" },
    { id: 2, name: "Diesel", value: "Diesel" },
    { id: 3, name: "Electric", value: "Electric" },
    { id: 4, name: "Hybrid", value: "Hybrid" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection("vehicleInfo", { [name]: value });
  };

  // Important: Component uses 'onSelect' and returns the value
  const handleDropdownSelect = (name, val) => {
    updateSection("vehicleInfo", { [name]: val });
  };

  const nextStep = () => navigate("/registration/document-upload");

  return (
    <RegistrationStepWrapper
      title="Vehicle Information"
      currentStep={2}
      icon={<CarFront className="text-orange-500 w-8 h-8" />}
    >
      <RegistrationInput
        label="Name or model"
        name="nameModel"
        placeholder="Enter name or model of your vehicle"
        value={formData.vehicleInfo.nameModel || ""}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Type</label>
        <Dropdown
          options={vehicleTypes}
          placeholder="Select vehicle type"
          value={formData.vehicleInfo.type}
          onSelect={(val) => handleDropdownSelect("type", val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label="License Plate Number"
        name="licensePlate"
        placeholder="Enter plate number"
        value={formData.vehicleInfo.licensePlate || ""}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Fuel Type</label>
        <Dropdown
          options={fuelTypes}
          placeholder="Select vehicle fuel type"
          value={formData.vehicleInfo.fuelType}
          onSelect={(val) => handleDropdownSelect("fuelType", val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label="Color"
        name="color"
        placeholder="Enter vehicle color"
        value={formData.vehicleInfo.color || ""}
        onChange={handleChange}
      />

      <StepNavigation onNext={nextStep} onSkip={nextStep} />
    </RegistrationStepWrapper>
  );
};

export default VehicleInfo;
