// App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import FooterNavbar from "./components/FooterNavbar";
import SideNavbar from "./components/SideNavbar"; // Import the new SideNavbar
import Dashboard from "./pages/Dashboard";
import CustomersPage from "./pages/CustomersPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import { useAuth } from "./context/AuthContext"; // Import useAuth

// Layout component to handle the navbars and content structure
const AppLayout = ({ children }) => {
  const { currentUser } = useAuth();

  // If not authenticated, just render the children without layout
  if (!currentUser) {
    return children;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop - Visible only on large screens */}
      <aside className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 hidden lg:block">
        <SideNavbar />
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-16 lg:pb-4">{children}</div>

      {/* FooterNavbar is self-conditional for auth and responsive design */}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes with layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </PrivateRoute>
            }
          />

          {/* Add more routes for your application */}
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <AppLayout>
                  {/* Replace with your Customers component */}
                  <CustomersPage />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/:customerId"
            element={
              <PrivateRoute>
                <AppLayout>
                  <CustomerDetailPage />
                </AppLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <AppLayout>
                  {/* Replace with your Transactions component */}
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                  </div>
                </AppLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <AppLayout>
                  {/* Replace with your Inventory component */}
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Inventory</h1>
                  </div>
                </AppLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <AppLayout>
                  {/* Replace with your Reports component */}
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Reports</h1>
                  </div>
                </AppLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <AppLayout>
                  {/* Replace with your Settings component */}
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                  </div>
                </AppLayout>
              </PrivateRoute>
            }
          />

          {/* Redirect to login if accessing root */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Catch all other routes and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>

        {/* Footer Navbar goes outside of Routes but inside Router and AuthProvider */}
        <FooterNavbar />
      </AuthProvider>
    </Router>
  );
}

export default App;
