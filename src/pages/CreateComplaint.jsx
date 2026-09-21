import React, { useContext, useState } from "react";
import { FileText, MapPin, Tag, Send } from "lucide-react";
import toast from "react-hot-toast";
import { baseurl } from "../services/baseUrl";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const CreateComplaint = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [otherCategory, setOtherCategory] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "category" && value !== "Other") {
      setOtherCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory =
      formData.category === "Other" ? otherCategory : formData.category;

    const complaintData = {
      title: formData.title,
      description: formData.description,
      category: finalCategory,
      location: formData.location,
    };

    try {
      const response = await fetch(`${baseurl}/complaints`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.detail || "Failed to create complaint");
        return;
      }

      toast.success("Complaint submitted successfully");
      
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
      });

      setOtherCategory("");

      navigate("/my-complaints");


    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <FileText size={30} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">Create a Complaint</h1>

          <p className="text-base-content/60 mt-2">
            Report an issue and help us make your community better.
          </p>
        </div>

        {/* Form */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Complaint Title
                  </span>
                </label>

                <div className="relative">
                  <FileText
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 z-10"
                  />

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter complaint title"
                    className="input input-bordered w-full pl-11"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>

                <div className="relative">
                  <Tag
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 z-10"
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full pl-11"
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Street Light">Street Light</option>
                    <option value="Public Safety">Public Safety</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Other Category Input */}
                {formData.category === "Other" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={otherCategory}
                      onChange={(e) => setOtherCategory(e.target.value)}
                      placeholder="Enter your category"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Location</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 z-10"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter the location of the problem"
                    className="input input-bordered w-full pl-11"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the problem in detail..."
                  className="textarea textarea-bordered w-full min-h-36 resize-none"
                  required
                />

                <div className="text-right text-xs text-base-content/50 mt-1">
                  {formData.description.length} characters
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3">
                <button type="submit" className="btn btn-primary w-full gap-2">
                  <Send size={18} />
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-sm text-base-content/50">
            Please provide accurate information so the issue can be resolved
            quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateComplaint;
