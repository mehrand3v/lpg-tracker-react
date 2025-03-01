

import { Link, useLocation } from "react-router-dom";
import { Home, Users, Clock, Package, Settings, LogOut } from "lucide-react";
import { signOut } from "../services/authService";
import { useNavigate } from "react-router-dom";

const FooterNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to determine if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Dynamic styles based on active state
  const getLinkStyles = (path) => {
    const active = isActive(path);
    return {
      textClass: active ? "text-white" : "text-gray-200",
      bgClass: active ? "bg-indigo-700" : "",
      iconClass: active ? "text-white" : "text-gray-200",
    };
  };

  const handleLogout = async () => {
    try {
      // Clear session storage on logout
      sessionStorage.removeItem("user");
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-800 to-indigo-900 shadow-lg lg:hidden border-t border-indigo-700">
      <div className="flex justify-around p-2">
        {/* Dashboard Link */}
        <Link
          to="/"
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 hover:scale-110 ${
            getLinkStyles("/").bgClass
          }`}
        >
          <Home className={`h-5 w-5 ${getLinkStyles("/").iconClass}`} />
          <span
            className={`text-xs font-medium mt-1 ${
              getLinkStyles("/").textClass
            }`}
          >
            Home
          </span>
        </Link>

        {/* Customers Link */}
        <Link
          to="/customers"
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-110 ${
            getLinkStyles("/customers").bgClass
          }`}
        >
          <Users
            className={`h-5 w-5 ${getLinkStyles("/customers").iconClass}`}
          />
          <span
            className={`text-xs font-medium mt-1 ${
              getLinkStyles("/customers").textClass
            }`}
          >
            Customers
          </span>
        </Link>

        {/* Transactions Link */}
        <Link
          to="/transactions"
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-110 ${
            getLinkStyles("/transactions").bgClass
          }`}
        >
          <Clock
            className={`h-5 w-5 ${getLinkStyles("/transactions").iconClass}`}
          />
          <span
            className={`text-xs font-medium mt-1 ${
              getLinkStyles("/transactions").textClass
            }`}
          >
            History
          </span>
        </Link>

        {/* Inventory Link */}
        <Link
          to="/inventory"
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-110 ${
            getLinkStyles("/inventory").bgClass
          }`}
        >
          <Package
            className={`h-5 w-5 ${getLinkStyles("/inventory").iconClass}`}
          />
          <span
            className={`text-xs font-medium mt-1 ${
              getLinkStyles("/inventory").textClass
            }`}
          >
            Stock
          </span>
        </Link>

        {/* Settings Link */}
        <Link
          to="/settings"
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-110 ${
            getLinkStyles("/settings").bgClass
          }`}
        >
          <Settings
            className={`h-5 w-5 ${getLinkStyles("/settings").iconClass}`}
          />
          <span
            className={`text-xs font-medium mt-1 ${
              getLinkStyles("/settings").textClass
            }`}
          >
            Settings
          </span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-200 hover:bg-indigo-700 transition-all duration-300 hover:scale-110"
        >
          <LogOut className="h-5 w-5 text-gray-200" />
          <span className="text-xs font-medium mt-1">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default FooterNavbar;