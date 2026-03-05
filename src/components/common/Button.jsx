export default function Button({ text, onClick,icon,  type = "button", variant = "primary" }) {
  const baseStyles = "px-6 py-2.5 cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 shadow-sm";

  const variants = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200",
    secondary: "bg-white text-black hover:bg-gray-100 border border-gray-200 shadow-sm shadow-gray-200"
  };

  return (
    <div className="inline-block">
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]}`}
      >
        {icon && <span>{icon}</span>}
      {text}
      </button>
    </div>
  );
}