import React, { forwardRef } from "react";

export const RegistrationInput = forwardRef(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 min-h-[85px]">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref} // For scrolling to the field
            {...props}
            className={`w-full p-3 bg-white border rounded-lg outline-none transition-all text-sm
            ${
              error
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-200 focus:border-orange-500"
            }`}
          />
        </div>
        {/* Error message matches Figma red color */}
        <span
          className={`text-[10px] text-red-500 font-medium transition-opacity ${error ? "opacity-100" : "opacity-0"}`}
        >
          {error || "placeholder"}
        </span>
      </div>
    );
  },
);
