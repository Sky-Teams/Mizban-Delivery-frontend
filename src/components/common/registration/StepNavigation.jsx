import React from "react";

const StepNavigation = ({ onNext, onSkip, showSkip = true }) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      {showSkip && (
        <button
          onClick={onSkip}
          className="flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
        >
          Skip for now
        </button>
      )}
      <button
        onClick={onNext}
        className="flex-1 py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 hover:bg-[#e44e34] transition-all"
      >
        Save and continue
      </button>
    </div>
  );
};

export default StepNavigation;
