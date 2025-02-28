
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";
import TransactionCard from "../components/TransactionCard";
import Navbar from "../components/FooterNavbar";


const Dashboard = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard title="Total Customers" value="120" icon="👥" />
        <MetricCard title="Total Cylinders" value="500" icon="🔥" />
        <MetricCard title="Total Balance Due" value="₹25,000" icon="💰" />
      </div>

      {/* Quick Actions Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button text="Add Customer" onClick={() => console.log("Add Customer")} />
        <Button text="Add Transaction" onClick={() => console.log("Add Transaction")} />
        <Button text="Update Inventory" onClick={() => console.log("Update Inventory")} />
      </div>

      {/* Recent Transactions Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          <TransactionCard customer="John Doe" type="CYLINDER_OUT" amount="₹1,000" date="2023-10-01" />
          <TransactionCard customer="Jane Smith" type="PAYMENT" amount="₹500" date="2023-10-02" />
        </div>
      </div>

      {/* Optional: Navbar */}
      <Navbar />
    </div>
  );
};

export default Dashboard;

