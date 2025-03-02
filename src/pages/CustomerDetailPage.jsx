import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchCustomerById,
  fetchCustomerTransactions,
} from "../services/firebaseService";
import {
  User,
  Phone,
  MapPin,
  ArrowLeft,
  DollarSign,
  Loader2,
  Flame,
  TrendingDown,
  TrendingUp,
  Clock,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CustomerDetailPage = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    amountPaid: 0,
    balanceDue: 0,
    totalCylindersIssued: 0,
    totalCylindersReturned: 0,
    cylindersOut: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15); // Increased from 10 to show more per page
  const [filters, setFilters] = useState({
    type: "all", // 'all', 'sale', 'payment', 'return'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomerData = async () => {
      try {
        // Fetch customer details
        const customerData = await fetchCustomerById(customerId);
        setCustomer(customerData);

        // Fetch customer transactions
        const transactionsData = await fetchCustomerTransactions(customerId);
        setTransactions(transactionsData);

        // Calculate statistics
        calculateStats(transactionsData);

        setLoading(false);
      } catch (error) {
        console.error("Error loading customer data:", error);
        setLoading(false);
      }
    };

    loadCustomerData();
  }, [customerId]);

  const calculateStats = (transactions) => {
    const stats = transactions.reduce(
      (acc, transaction) => {
        // Calculate financial stats
        acc.totalAmount += transaction.amount || 0;

        if (transaction.type === "payment") {
          acc.amountPaid += transaction.amount || 0;
        }

        // Calculate cylinder stats
        if (transaction.cylindersIssued) {
          acc.totalCylindersIssued += transaction.cylindersIssued;
        }

        if (transaction.cylindersReturned) {
          acc.totalCylindersReturned += transaction.cylindersReturned;
        }

        return acc;
      },
      {
        totalAmount: 0,
        amountPaid: 0,
        totalCylindersIssued: 0,
        totalCylindersReturned: 0,
      }
    );

    // Calculate derived stats
    stats.balanceDue = stats.totalAmount - stats.amountPaid;
    stats.cylindersOut =
      stats.totalCylindersIssued - stats.totalCylindersReturned;

    setStats(stats);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp.toDate()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type === "all") return true;
    return transaction.type === filters.type;
  });

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const handleAddTransaction = () => {
    navigate(`/customers/${customerId}/new-transaction`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-12">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-2 md:p-4 max-w-full">
      {/* Back button */}
      <Link
        to="/customers"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-3 text-sm"
      >
        <ArrowLeft className="h-3 w-3 mr-1" />
        Back to Customers
      </Link>

      {/* Customer Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-3">
        <div className="flex flex-row items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <span className="text-lg text-indigo-700 font-medium">
                {customer?.name?.substring(0, 2).toUpperCase() || "NA"}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {customer?.name || "Unknown Customer"}
              </h1>
              <p className="text-gray-500 text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Since:{" "}
                {customer?.createdAt ? formatDate(customer.createdAt) : "N/A"}
              </p>
            </div>
          </div>
          <Link
            to={`/customers/${customerId}/new-transaction`}
            className="px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 flex items-center"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Transaction
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
          <div className="flex items-start">
            <Phone className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-gray-800">
                {customer?.phone || "No phone number"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-gray-800">
                {customer?.address || "No address"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <User className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Notes</p>
              <p className="text-gray-800">{customer?.notes || "No notes"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial & Cylinder Stats - More Compact Layout */}
      <div className="grid grid-cols-6 gap-2 mb-3">
        {/* Financial Stats */}
        <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-lg p-2 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-xs">Total</p>
              <p className="text-base font-bold">
                {formatCurrency(stats.totalAmount)}
              </p>
            </div>
            <DollarSign className="h-4 w-4 text-indigo-200" />
          </div>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg p-2 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 text-xs">Paid</p>
              <p className="text-base font-bold">
                {formatCurrency(stats.amountPaid)}
              </p>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-200" />
          </div>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-rose-500 to-rose-700 rounded-lg p-2 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-100 text-xs">Balance</p>
              <p className="text-base font-bold">
                {formatCurrency(stats.balanceDue)}
              </p>
            </div>
            <TrendingDown className="h-4 w-4 text-rose-200" />
          </div>
        </div>

        {/* Cylinder Stats */}
        <div className="col-span-2 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs">Issued</p>
              <p className="text-base font-bold text-amber-600">
                {stats.totalCylindersIssued}
              </p>
            </div>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs">Returned</p>
              <p className="text-base font-bold text-green-600">
                {stats.totalCylindersReturned}
              </p>
            </div>
            <Flame className="h-4 w-4 text-green-500" />
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs">Outstanding</p>
              <p className="text-base font-bold text-blue-600">
                {stats.cylindersOut}
              </p>
            </div>
            <Flame className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">
            Transaction History
          </h2>
          <div className="flex items-center space-x-1 mt-2 md:mt-0 text-xs">
            <button
              onClick={() => setFilters({ ...filters, type: "all" })}
              className={`px-2 py-1 rounded ${
                filters.type === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilters({ ...filters, type: "sale" })}
              className={`px-2 py-1 rounded ${
                filters.type === "sale"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              Sales
            </button>
            <button
              onClick={() => setFilters({ ...filters, type: "payment" })}
              className={`px-2 py-1 rounded ${
                filters.type === "payment"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setFilters({ ...filters, type: "return" })}
              className={`px-2 py-1 rounded ${
                filters.type === "return"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              Returns
            </button>
          </div>
        </div>

        {currentTransactions.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            No transaction history found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Returned
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-2 py-1.5 whitespace-nowrap text-xs text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-2 py-1.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === "sale"
                            ? "bg-indigo-100 text-indigo-800"
                            : transaction.type === "payment"
                            ? "bg-green-100 text-green-800"
                            : transaction.type === "return"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {transaction.type?.charAt(0).toUpperCase() +
                          transaction.type?.slice(1) || "Unknown"}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 whitespace-nowrap text-xs">
                      <span
                        className={
                          transaction.type === "payment"
                            ? "text-green-600 font-medium"
                            : "text-gray-900"
                        }
                      >
                        {formatCurrency(transaction.amount || 0)}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 whitespace-nowrap text-xs text-gray-900">
                      {transaction.cylindersIssued || "-"}
                    </td>
                    <td className="px-2 py-1.5 whitespace-nowrap text-xs text-gray-900">
                      {transaction.cylindersReturned || "-"}
                    </td>
                    <td className="px-2 py-1.5 text-xs text-gray-900 truncate max-w-xs">
                      {transaction.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Compact Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-3 text-xs">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <span className="text-xs text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailPage;
