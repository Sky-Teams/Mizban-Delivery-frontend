import React from 'react';
import { LuLoader } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

const StepNavigation = ({ onNext, onSkip, showSkip = true, isLoading = false }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      {showSkip && (
        <button
          onClick={onSkip}
          disabled={isLoading}
          className={`flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl transition-colors 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'}`}
        >
          {t('NAVIGATION_SKIP')}
        </button>
      )}

      <button
        onClick={onNext}
        disabled={isLoading}
        className={`flex-1 flex items-center justify-center py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 transition-all 
          ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#e44e34]'}`}
      >
        {isLoading ? (
          <>
            <LuLoader className="w-4 h-4 mr-2 animate-spin" />
            {t('NAVIGATION_PROCESSING')}
          </>
        ) : (
          t('NAVIGATION_SAVE_CONTINUE')
        )}
      </button>
    </div>
  );
};

export default StepNavigation;
