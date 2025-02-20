import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]); // Limpiar errores si el registro es exitoso
    } catch (error) {
      console.error(error.response);
      setErrors(
        Array.isArray(error.response.data)
          ? error.response.data
          : [error.response.data]
      );
    }
  };

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      console.log(res);
      setErrors([]); // Limpiar errores si el inicio de sesión es exitoso
    } catch (error) {
      console.error(error.response);
      setErrors(
        Array.isArray(error.response.data)
          ? error.response.data
          : [error.response.data]
      );
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer); // Limpiar el timer cuando se desmonta el componente
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
