import { createContext, useContext, useState, useEffect } from "react";
import auth from "../service/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and get user profile
      auth.getProfile()
        .then(response => {
          if (response.user) {
            setUser(response.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await auth.login(email, password);
      
      if (response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        return { success: true };
      } else {
        setError(response.message || "Login failed");
        return { success: false, message: response.message || "Login failed" };
      }
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const register = async (username, email, password, role) => {
    try {
      setError(null);
      const response = await auth.register(username, email, password, role);
      
      if (response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        return { success: true };
      } else {
        setError(response.message || "Registration failed");
        return { success: false, message: response.message || "Registration failed" };
      }
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setError(null);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
