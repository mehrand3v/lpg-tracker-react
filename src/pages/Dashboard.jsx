import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";
import TransactionCard from "../components/TransactionCard";
import Navbar from "../components/FooterNavbar";


const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Fetch total customers
    const fetchCustomers = async () => {
      const querySnapshot = await getDocs(collection(db, "customers"));
      setTotalCustomers(querySnapshot.size);
    };

    // Fetch recent transactions
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const transactions = querySnapshot.docs.map((doc) => doc.data());
      setRecentTransactions(transactions.slice(0, 5)); // Show last 5 transactions
    };

    fetchCustomers();
    fetchTransactions();
  }, []);
    return (
      <div className="p-4">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            title="Total Customers"
            value={totalCustomers}
            icon="👥"
          />
          <MetricCard title="Total Cylinders" value="500" icon="🔥" />
          <MetricCard title="Total Balance Due" value="25,000" icon="" />
        </div>

        {/* Quick Actions Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            text="Add Customer"
            onClick={() => console.log("Add Customer")}
          />
          <Button
            text="Add Transaction"
            onClick={() => console.log("Add Transaction")}
          />
          <Button
            text="Update Inventory"
            onClick={() => console.log("Update Inventory")}
          />
        </div>

        {/* Recent Transactions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <TransactionCard
                key={index}
                customer={transaction.customerId}
                type={transaction.type}
                amount={`${transaction.amount}`}
                date={transaction.createdAt.toDate().toLocaleDateString()}
              />
            ))}
          </div>
        </div>

        {/* Optional: Navbar */}
        <Navbar />
      </div>
    );
};

export default Dashboard;

