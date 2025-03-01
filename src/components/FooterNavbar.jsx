import { Link, useLocation } from "react-router-dom";
import { Home, Users, Clock, Package, Settings } from "lucide-react";

const FooterNavbar = () => {
  const location = useLocation();

  // Helper function to determine if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Dynamic styles based on active state
  const getLinkStyles = (path) => {
    const active = isActive(path);
    return {
      textClass: active ? "text-white" : "text-gray-200",
      bgClass: active ? "bg-blue-600" : "",
      iconClass: active ? "text-white" : "text-gray-200",
    };
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg lg:hidden border-t border-blue-700">
      <div className="flex justify-around p-2">
        {/* Dashboard Link */}
        <Link
          to="/"
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-300 hover:scale-110 ${
            getLinkStyles("/").bgClass
          }`}
        >
          <Home className={`h-6 w-6 ${getLinkStyles("/").iconClass}`} />
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
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-300 hover:scale-110 ${
            getLinkStyles("/customers").bgClass
          }`}
        >
          <Users
            className={`h-6 w-6 ${getLinkStyles("/customers").iconClass}`}
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
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-300 hover:scale-110 ${
            getLinkStyles("/transactions").bgClass
          }`}
        >
          <Clock
            className={`h-6 w-6 ${getLinkStyles("/transactions").iconClass}`}
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
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-300 hover:scale-110 ${
            getLinkStyles("/inventory").bgClass
          }`}
        >
          <Package
            className={`h-6 w-6 ${getLinkStyles("/inventory").iconClass}`}
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
          className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-300 hover:scale-110 ${
            getLinkStyles("/settings").bgClass
          }`}
        >
          <Settings
            className={`h-6 w-6 ${getLinkStyles("/settings").iconClass}`}
          />
          <span
            className={`text-xs font-medium mt-1 ${
              getLinkStyles("/settings").textClass
            }`}
          >
            Settings
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default FooterNavbar;
