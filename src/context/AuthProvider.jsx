import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseurl } from "./../services/baseUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("city_token"),
  );

  const [loading, setLoading] = useState(true);

  const signUp = async (userData) => {
    try {
      const response = await fetch(`${baseurl}/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Signup failed");
        return false;
      }

      toast.success("Account created successfully");
      return true;
    } catch (error) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const login = async (username, password) => {
    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(`${baseurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      console.log("Login status:", response.status);
      console.log("Login response:", data);

      if (!response.ok) {
        toast.error(data.detail || "Invalid username or password");
        return false;
      }

      if (!data.access_token) {
        toast.error("Invalid username or password");
        return false;
      }

      localStorage.setItem("city_token", data.access_token);
      setAccessToken(data.access_token);

      toast.success(`${username} Login successful`);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
      return false;
    }
  };

  const getUser = async (token = accessToken) => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseurl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("city_token");
        setAccessToken(null);
        setAuthUser(null);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setAuthUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("city_token");
    setAccessToken(null);
    setAuthUser(null);

    toast.success("Logged out successfully");
  };

  useEffect(() => {
    getUser();
  }, [accessToken]);

  const authInfo = {
    signUp,
    login,
    accessToken,
    authUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
