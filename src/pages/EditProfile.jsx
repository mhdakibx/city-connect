
import React, { useContext, useEffect, useState } from "react";
import { User, Mail, AtSign, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/baseUrl";

const EditProfile = () => {
  const { accessToken, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${baseurl}/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.detail || "Failed to load profile");
          return;
        }

        setFormData({
          email: data.email || "",
          username: data.username || "",
          firstname: data.firstname || "",
          lastname: data.lastname || "",
        });
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.username.trim() ||
      !formData.firstname.trim() ||
      !formData.lastname.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(`${baseurl}/edituser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          firstname: formData.firstname,
          lastname: formData.lastname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Failed to update profile");
        return;
      }

      // AuthContext-এর user update করা
      if (setAuthUser) {
        setAuthUser(data);
      }

      toast.success("Profile updated successfully");

      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/profile" className="btn btn-ghost gap-2">
            <ArrowLeft size={18} />
            Back to Profile
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="text-base-content/60 mt-1">
                Update your profile information
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>

                <label className="input input-bordered flex items-center gap-3">
                  <Mail size={18} className="text-base-content/50" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Enter email"
                  />
                </label>
              </div>

              {/* Username */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Username</span>
                </label>

                <label className="input input-bordered flex items-center gap-3">
                  <AtSign size={18} className="text-base-content/50" />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Enter username"
                  />
                </label>
              </div>

              {/* First Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>

                <label className="input input-bordered flex items-center gap-3">
                  <User size={18} className="text-base-content/50" />

                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Enter first name"
                  />
                </label>
              </div>

              {/* Last Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>

                <label className="input input-bordered flex items-center gap-3">
                  <User size={18} className="text-base-content/50" />

                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Enter last name"
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Link to="/" className="btn btn-ghost">
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary gap-2"
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Update Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
