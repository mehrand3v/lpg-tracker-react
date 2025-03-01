import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import {
  fetchCustomers,
  fetchRecentTransactions,
} from "../services/firebaseService";
import { db } from "../firebase";
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";
import TransactionCard from "../components/TransactionCard";
import {
  Users,
  Flame,
  Wallet,
  UserPlus,
  ShoppingCart,
  Package,
  Settings,
  Home,
  PieChart,
  RefreshCw,
  DollarSign,
  Menu,
  X,
  Loader2,
} from "lucide-react";

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add status for each section loading state
  const [customersLoading, setCustomersLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  const fetchData = async () => {
    setRefreshing(true);
    setCustomersLoading(true);
    setTransactionsLoading(true);

    try {
      // Fetch total customers
     const { totalCustomers } = await fetchCustomers();
     setTotalCustomers(totalCustomers);
     setCustomersLoading(false);

      // Fetch recent transactions
      const transactions = await fetchRecentTransactions(5);
      setRecentTransactions(transactions);
      setTransactionsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setCustomersLoading(false);
      setTransactionsLoading(false);
    } finally {
      setLoading(false);
      // Add a small delay to make the refresh animation more visible
      setTimeout(() => {
        setRefreshing(false);
      }, 700);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRefresh = () => {
    // Clear all data first to show proper loading states
    setRecentTransactions([]);
    setTotalCustomers(0);
    fetchData();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white">
        <div className="p-5 border-b border-blue-600">
          <h2 className="text-xl font-bold">Gas Dashboard</h2>
        </div>

        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="px-4 space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-white bg-blue-800 rounded-lg"
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
            >
              <Users className="mr-3 h-5 w-5" />
              Customers
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              Transactions
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
            >
              <Package className="mr-3 h-5 w-5" />
              Inventory
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
            >
              <PieChart className="mr-3 h-5 w-5" />
              Reports
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-blue-600">
              <h2 className="text-xl font-bold">Gas Dashboard</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="px-4 space-y-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-white bg-blue-800 rounded-lg"
                >
                  <Home className="mr-3 h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Customers
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  Transactions
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
                >
                  <Package className="mr-3 h-5 w-5" />
                  Inventory
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
                >
                  <PieChart className="mr-3 h-5 w-5" />
                  Reports
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-24 lg:pb-6">
        <div className="p-4 max-w-full">
          {/* Header with mobile menu button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center">
                <button
                  className="lg:hidden mr-4"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              </div>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's your business at a glance
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              title="Reload data"
            >
              {refreshing ? (
                <div className="animate-spin">
                  <Loader2 className="h-5 w-5" />
                </div>
              ) : (
                <RefreshCw className="h-5 w-5 hover:rotate-180 transition-transform duration-500" />
              )}

              {/* Ripple effect when clicked */}
              {refreshing && (
                <span className="absolute inset-0 pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30"></span>
                </span>
              )}
            </button>
          </div>

          {/* Metrics Section - Smaller cards on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6">
            <MetricCard
              title="Total Customers"
              value={
                customersLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  totalCustomers
                )
              }
              icon={<Users size={20} className="text-white" />}
              color="from-blue-400 to-blue-600"
            />
            <MetricCard
              title="Total Cylinders"
              value={
                loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  "500"
                )
              }
              icon={<Flame size={20} className="text-white" />}
              color="from-orange-400 to-orange-600"
            />
            <MetricCard
              title="Balance Due"
              value={
                loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  formatCurrency(25000)
                )
              }
              icon={<Wallet size={20} className="text-white" />}
              color="from-green-400 to-green-600"
            />
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <Button
                text="New Sale"
                icon={<DollarSign size={16} />}
                onClick={() => console.log("New Sale")}
                variant="success"
              />
              <Button
                text="Add Customer"
                icon={<UserPlus size={16} />}
                onClick={() => console.log("Add Customer")}
              />
              <Button
                text="Add Transaction"
                icon={<ShoppingCart size={16} />}
                onClick={() => console.log("Add Transaction")}
              />
              <Button
                text="Update Inventory"
                icon={<Package size={16} />}
                onClick={() => console.log("Update Inventory")}
                variant="warning"
              />
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart size={18} className="mr-2 text-blue-500" />
              Recent Transactions
            </h2>

            {transactionsLoading ? (
              <div className="py-8 flex flex-col items-center text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                <p>Loading transactions...</p>
              </div>
            ) : recentTransactions.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {recentTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    customer={transaction.customerId || "Unknown Customer"}
                    type={transaction.type || "Transaction"}
                    amount={
                      transaction.amount
                        ? formatCurrency(transaction.amount)
                        : "$0"
                    }
                    date={
                      transaction.createdAt
                        ?.toDate()
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }) || "Unknown date"
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No recent transactions found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
