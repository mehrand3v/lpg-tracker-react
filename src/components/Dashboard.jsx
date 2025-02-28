import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const recentTransactions = [
    {
      id: "1",
      customerName: "John Doe",
      type: "CYLINDER_OUT",
      cylindersQuantity: 2,
      amount: 1200,
      date: "24 Feb 2025",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      type: "PAYMENT",
      paymentAmount: 800,
      date: "23 Feb 2025",
    },
    {
      id: "3",
      customerName: "Bob Johnson",
      type: "CYLINDER_IN",
      cylindersQuantity: 1,
      date: "22 Feb 2025",
    },
  ];

  const inventorySummary = {
    totalCylinders: 50,
    cylindersWithCustomers: 32,
    fullInShop: 10,
    emptyInShop: 8,
  };

  // Function to get appropriate color for transaction type
  const getTransactionColor = (type) => {
    switch (type) {
      case "CYLINDER_OUT":
        return "text-red-600";
      case "CYLINDER_IN":
        return "text-green-600";
      case "PAYMENT":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  // Function to get appropriate icon for transaction type
  const getTransactionIcon = (type) => {
    switch (type) {
      case "CYLINDER_OUT":
        return "↑";
      case "CYLINDER_IN":
        return "↓";
      case "PAYMENT":
        return "₹";
      default:
        return "•";
    }
  };

  // Navigation component
  const NavBar = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10 shadow-lg">
      <div className="flex justify-around">
        {[
          "dashboard",
          "customers",
          "transactions",
          "inventory",
          "settings",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 rounded-lg flex flex-col items-center transition-all duration-200 ${
              activeTab === tab
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <span className="text-xl">
              {tab === "dashboard" && "📊"}
              {tab === "customers" && "👥"}
              {tab === "transactions" && "💰"}
              {tab === "inventory" && "🛢️"}
              {tab === "settings" && "⚙️"}
            </span>
            <span className="text-xs capitalize">{tab}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  // Alert component
  const Alert = ({ message }) => (
    <div className="my-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-lg">
      <p className="font-bold">Coming Soon</p>
      <p>{message}</p>
    </div>
  );

  // Main dashboard content
  const DashboardContent = () => (
    <div className="p-4 pb-20">
      {/* Inventory Summary Cards */}

      <div className="mt-2 grid grid-cols-2 gap-4">
        {[
          {
            label: "Total Cylinders",
            value: inventorySummary.totalCylinders,
            bgColor: "bg-blue-100",
            textColor: "text-blue-700",
          },
          {
            label: "With Customers",
            value: inventorySummary.cylindersWithCustomers,
            bgColor: "bg-orange-100",
            textColor: "text-orange-700",
          },
          {
            label: "Full In Shop",
            value: inventorySummary.fullInShop,
            bgColor: "bg-green-100",
            textColor: "text-green-700",
          },
          {
            label: "Empty In Shop",
            value: inventorySummary.emptyInShop,
            bgColor: "bg-red-100",
            textColor: "text-red-700",
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            <p className="text-gray-600 text-sm">{card.label}</p>
            <p className={`text-2xl font-bold ${card.textColor}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button className="text-blue-600 text-sm hover:underline">
            View All
          </button>
        </div>
        <div className="mt-2 bg-white rounded-lg shadow overflow-hidden">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border-b last:border-0 border-gray-100 p-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.customerName}</p>
                  <div className="flex items-center">
                    <span
                      className={`mr-1 font-bold ${getTransactionColor(
                        transaction.type
                      )}`}
                    >
                      {getTransactionIcon(transaction.type)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {transaction.type === "CYLINDER_OUT" &&
                        `${transaction.cylindersQuantity} cylinders out`}
                      {transaction.type === "CYLINDER_IN" &&
                        `${transaction.cylindersQuantity} cylinders in`}
                      {transaction.type === "PAYMENT" && `Payment received`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={
                      transaction.type === "PAYMENT"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {transaction.type === "PAYMENT"
                      ? `+₹${transaction.paymentAmount}`
                      : transaction.amount
                      ? `-₹${transaction.amount}`
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {[
            {
              label: "New Customer",
              icon: "➕",
              bgColor: "bg-blue-600",
            },
            {
              label: "Cylinder Out",
              icon: "📤",
              bgColor: "bg-green-600",
            },
            {
              label: "Cylinder In",
              icon: "📥",
              bgColor: "bg-orange-600",
            },
            {
              label: "Record Payment",
              icon: "💵",
              bgColor: "bg-purple-600",
            },
          ].map((action, index) => (
            <button
              key={index}
              className={`${action.bgColor} text-white rounded-lg p-4 text-center flex flex-col items-center justify-center hover:opacity-90 transition-opacity duration-200`}
            >
              <span className="text-2xl mb-1">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Customer content
  const CustomersContent = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Alert message="Customer management functionality coming soon!" />
    </div>
  );

  // Transactions content
  const TransactionsContent = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <Alert message="Transaction history and management coming soon!" />
    </div>
  );

  // Inventory content
  const InventoryContent = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <Alert message="Inventory management functionality coming soon!" />
    </div>
  );

  // Settings content
  const SettingsContent = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Alert message="Settings and configuration coming soon!" />
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">LPG Tracker</h1>
          <div className="flex space-x-3 items-center">
            <button className="p-1 hover:bg-blue-800 rounded-full transition-colors duration-200">
              🔔
            </button>
            <div className="h-8 w-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors duration-200">
              <span className="text-sm font-bold">AK</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "customers" && <CustomersContent />}
        {activeTab === "transactions" && <TransactionsContent />}
        {activeTab === "inventory" && <InventoryContent />}
        {activeTab === "settings" && <SettingsContent />}
        
      </main>

      {/* Navigation */}
      <NavBar />
    </div>
  );
};

export default Dashboard;
