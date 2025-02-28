const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default MetricCard;
