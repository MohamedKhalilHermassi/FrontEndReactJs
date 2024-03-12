import React, { createContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state (null means no user logged in)

  // Example: Check if user is logged in on component mount
  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage or session storage)
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Parse the user object from storage
    }
  }, []);

  // Example: Login function
  const login = (user) => {
    // Save user to localStorage or session storage
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  // Example: Logout function
  const logout = () => {
    // Remove user from localStorage or session storage
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
