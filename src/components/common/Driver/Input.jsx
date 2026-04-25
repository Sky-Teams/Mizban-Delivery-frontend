import React from "react";

const Input = React.forwardRef(({ label, error, ...props }, ref) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input ref={ref} {...props} className="w-full border rounded-xl p-2 mt-2" />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
));

export default Input;
