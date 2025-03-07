import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingCart,
  Package,
  PieChart,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import reactLogo from '../assets/profile2.png';
// import reactLogo from '../assets/profile1.jpg'; // Adjust the path according to your folder structure

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  const isActive = (path) => location.pathname.startsWith(path);

  const getLinkStyles = (path) => ({
    className: isActive(path)
      ? "flex items-center px-4 py-3 text-white bg-indigo-700 rounded-lg"
      : "flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-lg",
  });

  const handleLogout = async () => {
    try {
      await signOut(); // Call Firebase's signOut method
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex-1 pt-5 pb-4 overflow-y-auto hidden lg:block">
      <div className="px-4 space-y-1">
        {/* User Profile Section */}
        <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-indigo-800 text-white">
          <img
            src={reactLogo} // Using the imported image
            alt="Profile"
            className="h-14 w-14 rounded-full border border-indigo-800   object-cover"
            style={{
              filter: "grayscale(10%) brightness(0.9) contrast(1.5)", // Apply filters here
            }}
          />
        </div>

        <Link to="/dashboard" {...getLinkStyles("/dashboard")}>
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link to="/customers" {...getLinkStyles("/customers")}>
          <Users className="mr-3 h-5 w-5" />
          Customers
        </Link>
        <Link to="/transactions" {...getLinkStyles("/transactions")}>
          <ShoppingCart className="mr-3 h-5 w-5" />
          Transactions
        </Link>
        <Link to="/inventory" {...getLinkStyles("/inventory")}>
          <Package className="mr-3 h-5 w-5" />
          Inventory
        </Link>
        <Link to="/reports" {...getLinkStyles("/reports")}>
          <PieChart className="mr-3 h-5 w-5" />
          Reports
        </Link>
        <Link to="/settings" {...getLinkStyles("/settings")}>
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-8 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-lg cursor-pointer"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;
