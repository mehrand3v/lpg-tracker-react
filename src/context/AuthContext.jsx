import { createContext, useContext, useState, useEffect } from "react";
import { subscribeToAuthChanges } from "../services/authService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage first for existing user data
    const sessionUser = sessionStorage.getItem("user");

    if (sessionUser) {
      setCurrentUser(JSON.parse(sessionUser));
      setLoading(false);
    }

    // Subscribe to Firebase auth changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        // If we get a user from Firebase, update state and session
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          lastLogin: new Date().toISOString(),
        };

        setCurrentUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        // No user from Firebase, clear session
        sessionStorage.removeItem("user");
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
