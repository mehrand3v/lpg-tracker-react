import { Clock, User, Tag } from "lucide-react";

const TransactionCard = ({ customer, type, amount, date }) => {
  // Determine color based on transaction type
  const getTypeColor = (type) => {
    const types = {
      purchase: "text-green-600 bg-green-100",
      sale: "text-blue-600 bg-blue-100",
      payment: "text-purple-700 bg-purple-100",
      refund: "text-red-600 bg-red-100",
      "cylinder-in": "text-emerald-600 bg-emerald-100",
      cylinder_in: "text-emerald-600 bg-emerald-100",
      "cylinder-out": "text-amber-600 bg-amber-100",
      cylinder_out: "text-amber-600 bg-amber-100",
    };

    return types[type?.toLowerCase()] || "text-gray-600 bg-gray-100";
  };

  const typeClasses = getTypeColor(type);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <User size={16} className="text-gray-400 mr-1" />
            {customer}
          </h3>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs px-2 py-1 rounded-full ${typeClasses} font-medium`}
            >
              {type}
            </span>
            <span className="text-xs text-gray-500 ml-2 flex items-center">
              <Clock size={12} className="mr-1" />
              {date}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-lg font-bold ${
              type?.toLowerCase() === "refund" ||
              type?.toLowerCase() === "cylinder-out" ||
              type?.toLowerCase() === "cylinder_out"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
