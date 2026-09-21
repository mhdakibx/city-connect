import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Signup = () => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChenge = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, username, email, password } = formData;

    if (!firstname.trim()) {
      return toast.error("First name is required");
    }

    if (!lastname.trim()) {
      return toast.error("Last name is required");
    }

    if (!username.trim()) {
      return toast.error("Username is required");
    }

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    if (!email.includes("@")) {
      return toast.error("Enter a valid email");
    }

    if (!password) {
      return toast.error("Password is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be 6-8 characters");
    }

    try {
      setLoading(true);

      const success = await signUp(formData);

      if (success) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300 rounded-2xl w-full max-w-lg p-8 shadow-xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Create Account</h1>

          <p className="text-base-content/60 mt-2">Join CityConnect today</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium">First Name</label>

            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChenge}
              className="input input-bordered w-full"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="label font-medium">Last Name</label>

            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChenge}
              className="input input-bordered w-full"
              placeholder="Last name"
            />
          </div>
        </div>

        <label className="label font-medium mt-3">Username</label>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChenge}
          className="input input-bordered w-full"
          placeholder="Choose a username"
        />

        <label className="label font-medium mt-3">Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChenge}
          className="input input-bordered w-full"
          placeholder="Enter your email"
        />

        <label className="label font-medium mt-3">Password</label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChenge}
          className="input input-bordered w-full"
          placeholder="Create a password"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-6"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className="divider">OR</div>

        <p className="text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="link link-primary font-semibold"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
