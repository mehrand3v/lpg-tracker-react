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
import SideNavbar from "./components/SideNavbar";
import Dashboard from "./pages/Dashboard";
import CustomersPage from "./pages/CustomersPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import NewTransactionPage from "./pages/NewTransactionPage"; // Import the new transaction page
import { useAuth } from "./context/AuthContext";

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
            path="/customers/:customerId/new-transaction"
            element={
              <PrivateRoute>
                <AppLayout>
                  <NewTransactionPage />
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
