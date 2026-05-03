import React from 'react';
import { LuTriangleAlert } from 'react-icons/lu';
import RegistrationStepWrapper from '../../../components/common/registration/RegistrationStepWrapper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isRTL } from '../../../utils/IsRTLDirection';
import rejectedImage from '../../../assets/png/rejected.png';
import { ROUTE_PATHS } from '../../../routes/routePaths';

const RegistrationRejected = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <RegistrationStepWrapper
      title=""
      icon={<LuTriangleAlert className="text-orange-500 w-8 h-8" />}
      showProgress={false}
    >
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[280px] mb-6">
          <img
            src={rejectedImage}
            alt={t("REGISTRATION_REJECTED")}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="text-center space-y-4 mb-8">
          <h2 className="text-lg font-bold text-gray-800">
            {t('REJECTION_REASONS')}
          </h2>
          <ul
            dir={isRTL() ? 'rtl' : 'ltr'}
            className={`inline-block max-w-full list-decimal list-outside space-y-2 text-sm font-medium text-gray-600 ${
              isRTL() ? 'pr-5 text-right' : 'pl-5 text-left'
            }`}
          >
            <li>{t('INVALID_DOCUMENT')}</li>
            <li>{t('INVALID_VEHICLE_INFORMATION')}</li>
          </ul>
        </div>

        {/* Action Buttons matching Figma */}
        <div className="flex items-center justify-between gap-4 w-full mt-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
          >
            {t('NAVIGATION_SKIP')}
          </button>

          <button
            onClick={() => navigate(ROUTE_PATHS.PERSONAL_INFO)}
            className="flex-1 py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 hover:bg-[#e44e34] transition-all"
          >
            {t('GO_TO_REGISTRATION')}
          </button>
        </div>
      </div>
    </RegistrationStepWrapper>
  );
};

export default RegistrationRejected;
