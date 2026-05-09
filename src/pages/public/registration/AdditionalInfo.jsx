import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationStepWrapper from '../../../components/common/registration/RegistrationStepWrapper';
import { RegistrationInputWithIcon } from '../../../components/common/registration/RegistrationInputs';
import StepNavigation from '../../../components/common/registration/StepNavigation';
import { LuInfo, LuPhone, LuUser } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import useRegistrationStore from '../../../store/useRegistrationStore';
import { ROUTE_PATHS } from '../../../routes/routePaths';

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formData = useRegistrationStore((state) => state.formData);
  const updateSection = useRegistrationStore((state) => state.updateSection);
  const submitRegistration = useRegistrationStore((state) => state.submitRegistration);
  const isSubmitting = useRegistrationStore((state) => state.formData.status === 'submitting');

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('additionalInfo', { [name]: value });
  };

  const handleFinish = async () => {
    if (isSubmitting) return;

    const isSuccess = await submitRegistration();

    if (isSuccess) {
      navigate(ROUTE_PATHS.REGISTRATION_PENDING);
    } else {
      alert(t('ADDITIONAL_INFO_ERROR_MESSAGE'));
    }
  };

  return (
    <RegistrationStepWrapper
      title={t('ADDITIONAL_INFO_TITLE')}
      currentStep={4}
      icon={<LuInfo className="text-orange-500 w-8 h-8" />}
    >
      <p className="text-center text-xs text-gray-500 mb-2">
        {t('ADDITIONAL_INFO_OPTIONAL_DESCRIPTION')}
      </p>

      <div className="space-y-5">
        <RegistrationInputWithIcon
          label={t('EMERGENCY_CONTACT_NUMBER')}
          name="emergencyContact"
          placeholder={t('ENTER_EMERGENCY_CONTACT_NUMBER')}
          icon={LuPhone}
          value={formData.additionalInfo.emergencyContact || ''}
          onChange={handleChange}
        />

        <RegistrationInputWithIcon
          label={t('RELATIONSHIP')}
          name="relationship"
          placeholder={t('ENTER_RELATIONSHIP')}
          icon={LuUser}
          value={formData.additionalInfo.relationship || ''}
          onChange={handleChange}
        />
      </div>

      <StepNavigation onNext={handleFinish} onSkip={handleFinish} isLoading={isSubmitting} />
    </RegistrationStepWrapper>
  );
};

export default AdditionalInfo;
