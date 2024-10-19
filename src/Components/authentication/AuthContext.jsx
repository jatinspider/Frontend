import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get user from local storage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null; // Parse and return user data
  });

  const login = (userData) => {
    setUser(userData); // Set user data on login
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in local storage
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
    localStorage.removeItem("user"); // Remove user data from local storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };