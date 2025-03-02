import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchCustomerById,
  fetchCustomerTransactions
} from "../services/firebaseService";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowLeft,
  DollarSign,
  Loader2,
  Flame,
  TrendingDown,
  TrendingUp,
  Clock
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
    cylindersOut: 0
  });

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
    const stats = transactions.reduce((acc, transaction) => {
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
    }, {
      totalAmount: 0,
      amountPaid: 0,
      totalCylindersIssued: 0,
      totalCylindersReturned: 0
    });

    // Calculate derived stats
    stats.balanceDue = stats.totalAmount - stats.amountPaid;
    stats.cylindersOut = stats.totalCylindersIssued - stats.totalCylindersReturned;

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
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-24">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-full">
      {/* Back button */}
      <Link
        to="/customers"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Customers
      </Link>

      {/* Customer Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
              <span className="text-2xl text-indigo-700 font-medium">
                {customer?.name?.substring(0, 2).toUpperCase() || "NA"}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{customer?.name || "Unknown Customer"}</h1>
              <p className="text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Customer since: {customer?.createdAt ? formatDate(customer.createdAt) : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-800">{customer?.phone || "No phone number"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{customer?.email || "No email"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-800">{customer?.address || "No address"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Notes</p>
              <p className="text-gray-800">{customer?.notes || "No notes"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-sm">Total Amount</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <DollarSign className="h-6 w-6 text-indigo-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 text-sm">Amount Paid</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(stats.amountPaid)}</p>
            </div>
            <TrendingUp className="h-6 w-6 text-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-rose-700 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-100 text-sm">Balance Due</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(stats.balanceDue)}</p>
            </div>
            <TrendingDown className="h-6 w-6 text-rose-200" />
          </div>
        </div>
      </div>

      {/* Cylinder Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Cylinders Issued</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">{stats.totalCylindersIssued}</p>
            </div>
            <Flame className="h-6 w-6 text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Cylinders Returned</p>
              <p className="text-2xl font-bold mt-1 text-green-600">{stats.totalCylindersReturned}</p>
            </div>
            <Flame className="h-6 w-6 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Cylinders Outstanding</p>
              <p className="text-2xl font-bold mt-1 text-blue-600">{stats.cylindersOut}</p>
            </div>
            <Flame className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction History</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transaction history found for this customer
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cylinders Issued</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cylinders Returned</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${transaction.type === 'sale' ? 'bg-indigo-100 text-indigo-800' :
                          transaction.type === 'payment' ? 'bg-green-100 text-green-800' :
                          transaction.type === 'return' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'}`
                      }>
                        {transaction.type?.charAt(0).toUpperCase() + transaction.type?.slice(1) || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={transaction.type === 'payment' ? 'text-green-600 font-medium' : 'text-gray-900'}>
                        {formatCurrency(transaction.amount || 0)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.cylindersIssued || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.cylindersReturned || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transaction.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailPage;