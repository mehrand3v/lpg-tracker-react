const TransactionCard = ({ customer, type, amount, date }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{customer}</h3>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{amount}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
