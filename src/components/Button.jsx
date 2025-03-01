const Button = ({ text, onClick, icon, variant = "primary" }) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white",
    warning:
      "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
  };

  return (
    <button
      className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 font-medium flex items-center shadow-sm hover:shadow-md text-sm md:text-base cursor-pointer ${variants[variant]}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
