
import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, FileText, MapPin, Tag, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/baseUrl";

const UpdateComplaint = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [otherCategory, setOtherCategory] = useState("");

  useEffect(() => {
    const getComplaint = async () => {
      try {
        const response = await fetch(`${baseurl}/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.detail || "Failed to load complaint");
          return;
        }

        const categories = [
          "Road",
          "Garbage",
          "Water",
          "Electricity",
          "Drainage",
          "Street Light",
        ];

        if (categories.includes(data.category)) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            location: data.location || "",
          });
        } else {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: "Other",
            location: data.location || "",
          });

          setOtherCategory(data.category || "");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && id) {
      getComplaint();
    }
  }, [accessToken, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      category: value,
    }));

    if (value !== "Other") {
      setOtherCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory =
      formData.category === "Other"
        ? otherCategory.trim()
        : formData.category;

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !finalCategory ||
      !formData.location.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(`${baseurl}/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: finalCategory,
          location: formData.location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Failed to update complaint");
        return;
      }

      toast.success("Complaint updated successfully");

      navigate(`/complaints/${id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          to={`/complaints/${id}`}
          className="btn btn-ghost mb-5"
        >
          <ArrowLeft size={18} />
          Back to Complaint
        </Link>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Header */}
            <div className="mb-6 border-b border-base-300 pb-5">
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <FileText size={22} />
                </div>

                <h1 className="text-2xl font-bold">
                  Update Complaint
                </h1>
              </div>

              <p className="text-sm text-base-content/60">
                Update your complaint information below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Title */}
              <div>
                <label className="mb-2 block font-semibold">
                  Complaint Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter complaint title"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <Tag size={17} />
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="select select-bordered w-full"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Road">Road</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Water">Water</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Drainage">Drainage</option>
                  <option value="Street Light">
                    Street Light
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Other Category */}
              {formData.category === "Other" && (
                <div>
                  <label className="mb-2 block font-semibold">
                    Enter Category
                  </label>

                  <input
                    type="text"
                    value={otherCategory}
                    onChange={(e) =>
                      setOtherCategory(e.target.value)
                    }
                    placeholder="Enter your category"
                    className="input input-bordered w-full"
                  />
                </div>
              )}

              {/* Location */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <MapPin size={17} />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter complaint location"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your complaint"
                  rows="6"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <Link
                  to={`/complaints/${id}`}
                  className="btn btn-ghost"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary gap-2"
                >
                  {updating ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Save size={18} />
                  )}

                  {updating
                    ? "Updating..."
                    : "Update Complaint"}
                </button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateComplaint;

