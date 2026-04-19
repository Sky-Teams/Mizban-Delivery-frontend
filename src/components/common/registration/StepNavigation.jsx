import React from "react";
import { LuLoader } from "react-icons/lu"; // Import a loader icon

const StepNavigation = ({
  onNext,
  onSkip,
  showSkip = true,
  isLoading = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      {showSkip && (
        <button
          onClick={onSkip}
          disabled={isLoading} // Disable while loading
          className={`flex-1 py-3 text-sm font-medium text-orange-500 border border-orange-100 rounded-xl transition-colors 
            ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-50"}`}
        >
          Skip for now
        </button>
      )}

      <button
        onClick={onNext}
        disabled={isLoading} // Disable while loading
        className={`flex-1 flex items-center justify-center py-3 text-sm font-medium text-white bg-[#FF5A3D] rounded-xl shadow-lg shadow-orange-200 transition-all 
          ${isLoading ? "opacity-80 cursor-not-allowed" : "hover:bg-[#e44e34]"}`}
      >
        {isLoading ? (
          <>
            <LuLoader className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Save and continue"
        )}
      </button>
    </div>
  );
};

export default StepNavigation;
