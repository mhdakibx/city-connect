import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      toast.error("Please enter your username");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      //   console.log(formData)

      const success = await login(formData.username, formData.password);

      if (success) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-2xl w-full max-w-md border p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>

          <p className="text-base-content/60 mt-2">Login to your account</p>
        </div>

        <label className="label font-medium">Username</label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Enter your username"
        />

        <label className="label font-medium mt-3">Password</label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Enter your password"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary w-full mt-6"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="divider">OR</div>

        <p className="text-center text-sm text-base-content/70">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-primary font-semibold">
            Create Account
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
