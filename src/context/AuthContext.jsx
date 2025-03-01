// // context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { subscribeToAuthChanges } from "../services/authService";

// // Create the context
// const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Subscribe to auth changes when the component mounts
//     const unsubscribe = subscribeToAuthChanges((user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     // Unsubscribe when the component unmounts
//     return unsubscribe;
//   }, []);

//   // Values to provide to consuming components
//   const value = {
//     currentUser,
//     isAuthenticated: !!currentUser,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

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

    // Subscribe to Firebase auth changes as a backup
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        // If we get a user from Firebase but not in session, update session
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          lastLogin: new Date().toISOString(),
        };

        setCurrentUser(userData);

        // Update session storage
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        // If no user from Firebase and we're still loading, complete loading
        if (loading && !sessionUser) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}