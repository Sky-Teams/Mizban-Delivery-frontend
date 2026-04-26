import React, { forwardRef, useId } from "react";
import { LuUpload } from "react-icons/lu";

// 1. Input with Icon (Used in Additional Info)
export const RegistrationInputWithIcon = ({ label, icon: Icon, ...props }) => {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          {...props}
          className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none transition-all text-sm pr-10 focus:border-orange-500"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
          {Icon && <Icon size={18} />}
        </div>
      </div>
    </div>
  );
};

// 2. File Select (Used in Document Upload)
export const RegistrationFileSelect = ({
  label,
  placeholder,
  onChange,
  fileName,
  error,
}) => {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={onChange}
          accept="image/*,.pdf"
        />
        <div
          className={`w-full p-3 bg-white border rounded-lg flex items-center justify-between transition-all 
          ${error ? "border-red-500" : "border-gray-200 hover:border-orange-200"}`}
        >
          <span
            className={`text-sm truncate pr-4 ${fileName ? "text-gray-900" : "text-gray-400"}`}
          >
            {fileName || placeholder}
          </span>
          <LuUpload
            className={`h-4 w-4 ${error ? "text-red-500" : "text-gray-400"}`}
          />
        </div>
      </div>
      <div className="min-h-[15px]">
        {error && (
          <span className="text-[10px] text-red-500 font-medium">{error}</span>
        )}
      </div>
    </div>
  );
};

// 3. Standard Input (Used in Personal/Vehicle Info)
export const RegistrationInput = forwardRef(
  ({ label, error, ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full flex flex-col gap-1.5 min-h-[85px]">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            {...props}
            className={`w-full p-3 bg-white border rounded-lg outline-none transition-all text-sm
            ${
              error
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-200 focus:border-orange-500"
            }`}
          />
        </div>
        <span
          className={`text-[10px] text-red-500 font-medium min-h-[15px] transition-opacity ${error ? "opacity-100" : "opacity-0"}`}
        >
          {error || ""}
        </span>
      </div>
    );
  },
);
