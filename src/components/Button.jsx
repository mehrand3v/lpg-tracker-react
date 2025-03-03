

const Button = ({ text, onClick, icon, variant = "primary" }) => {

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white",
    success:
      "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white",
    warning:
      "bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white",
    danger:
      "bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white",
  };

  return (
    <button
      className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors duration-200 font-medium flex items-center shadow-sm hover:shadow-md text-sm md:text-base cursor-pointer ${variants[variant]}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
