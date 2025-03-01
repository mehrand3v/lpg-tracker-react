const MetricCard = ({
  title,
  value,
  icon,
  color = "from-blue-500 to-blue-700",
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${color} p-3 md:p-5 rounded-xl shadow-md text-white transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center mb-2">
        <div className="mr-3">{icon}</div>
        <h3 className="text-sm md:text-base font-medium">{title}</h3>
      </div>
      <div className="text-lg md:text-2xl font-bold ml-1 min-h-6">{value}</div>
    </div>
  );
};

export default MetricCard;
