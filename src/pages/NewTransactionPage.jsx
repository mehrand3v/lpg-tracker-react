// pages/NewTransactionPage.jsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addTransaction } from "../services/firebaseService";
import { DollarSign, Flame, ArrowLeft } from "lucide-react";

const NewTransactionPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    type: "sale", // Default transaction type
    amount: 0,
    cylindersIssued: 0,
    cylindersReturned: 0,
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(customerId, transaction);
      navigate(`/customers/${customerId}`); // Redirect back to customer detail page
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-full">
      {/* Back button */}
      <button
        onClick={() => navigate(`/customers/${customerId}`)}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Customer
      </button>

      {/* Transaction Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Transaction Type */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Transaction Type</label>
              <select
                value={transaction.type}
                onChange={(e) =>
                  setTransaction({ ...transaction, type: e.target.value })
                }
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="sale">Sale</option>
                <option value="payment">Payment</option>
                <option value="return">Return</option>
              </select>
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Amount</label>
              <div className="relative">
                <DollarSign className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={transaction.amount}
                  onChange={(e) =>
                    setTransaction({ ...transaction, amount: e.target.value })
                  }
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Amount"
                />
              </div>
            </div>

            {/* Cylinders Issued */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Cylinders Issued</label>
              <div className="relative">
                <Flame className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={transaction.cylindersIssued}
                  onChange={(e) =>
                    setTransaction({
                      ...transaction,
                      cylindersIssued: e.target.value,
                    })
                  }
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Cylinders Issued"
                />
              </div>
            </div>

            {/* Cylinders Returned */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Cylinders Returned</label>
              <div className="relative">
                <Flame className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={transaction.cylindersReturned}
                  onChange={(e) =>
                    setTransaction({
                      ...transaction,
                      cylindersReturned: e.target.value,
                    })
                  }
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Cylinders Returned"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="text-sm text-gray-500 mb-1">Notes</label>
            <textarea
              value={transaction.notes}
              onChange={(e) =>
                setTransaction({ ...transaction, notes: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add notes..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransactionPage;