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
    { id: 1, name: t('SEDAN'), value: 'Sedan' },
    { id: 2, name: t('SUV'), value: 'SUV' },
    { id: 3, name: t('TRUCK'), value: 'Truck' },
    { id: 4, name: t('VAN'), value: 'Van' },
    { id: 5, name: t('MOTORCYCLE'), value: 'Motorcycle' },
  ];

  const fuelTypes = [
    { id: 1, name: t('GASOLINE'), value: 'Gasoline' },
    { id: 2, name: t('DIESEL'), value: 'Diesel' },
    { id: 3, name: t('ELECTRIC'), value: 'Electric' },
    { id: 4, name: t('HYBRID'), value: 'Hybrid' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('vehicleInfo', { [name]: value });
  };

  const handleDropdownSelect = (name, val) => {
    updateSection('vehicleInfo', { [name]: val });
  };

  const nextStep = () => navigate('/registration/document-upload');

  return (
    <RegistrationStepWrapper
      title={t('VEHICLE_INFO_TITLE')}
      currentStep={2}
      icon={<RiMotorbikeFill className="text-orange-500 w-8 h-8" />}
    >
      <RegistrationInput
        label={t('NAME_OR_MODEL')}
        name="nameModel"
        placeholder={t('ENTER_VEHICLE_NAME_OR_MODEL')}
        value={formData.vehicleInfo.nameModel || ''}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{t('VEHICLE_INFO_TYPE_LABEL')}</label>
        <Dropdown
          options={vehicleTypes}
          placeholder={t('VEHICLE_INFO_TYPE_PLACEHOLDER')}
          value={formData.vehicleInfo.type}
          onSelect={(val) => handleDropdownSelect('type', val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label={t('LICENSE_PLATE_NUMBER')}
        name="licensePlate"
        placeholder={t('ENTER_PLATE_NUMBER')}
        value={formData.vehicleInfo.licensePlate || ''}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{t('FUEL_TYPE')}</label>
        <Dropdown
          options={fuelTypes}
          placeholder={t('SELECT_FUEL_TYPE')}
          value={formData.vehicleInfo.fuelType}
          onSelect={(val) => handleDropdownSelect('fuelType', val)}
          className="bg-white"
        />
      </div>

      <RegistrationInput
        label={t('COLOR')}
        name="color"
        placeholder={t('ENTER_COLOR')}
        value={formData.vehicleInfo.color || ''}
        onChange={handleChange}
      />

      <StepNavigation onNext={nextStep} onSkip={nextStep} />
    </RegistrationStepWrapper>
  );
};

export default VehicleInfo;
