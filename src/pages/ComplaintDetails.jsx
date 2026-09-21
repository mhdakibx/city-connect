import { useContext, useEffect, useState } from "react";
import {
  FileText,
  MapPin,
  CalendarDays,
  Tag,
  User,
  Clock,
  ArrowLeft,
  Trash2,
  Pencil,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/baseUrl";

const ComplaintDetails = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
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

        setComplaint(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && id) {
      fetchComplaint();
    }
  }, [accessToken, id]);

  const deleteComplaint = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const response = await fetch(`${baseurl}/complaints/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Failed to delete complaint");
        return;
      }

      toast.success("Complaint deleted successfully");

      navigate("/my-complaints");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Complaint not found</h2>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Top Buttons */}
        <div className="mb-5 flex items-center justify-between gap-3">

          {/* Back Button */}
          <Link
            to="/my-complaints"
            className="btn btn-ghost"
          >
            <ArrowLeft size={18} />
            Back to Complaints
          </Link>

          {/* Edit + Delete Buttons */}
          <div className="flex items-center gap-2">

            {/* Edit Button */}
            <Link
              to={`/complaints/edit/${complaint.id}`}
              className="btn btn-warning gap-2"
            >
              <Pencil size={18} />
              Edit
            </Link>

            {/* Delete Button */}
            <button
              onClick={deleteComplaint}
              disabled={deleting}
              className="btn btn-error gap-2"
            >
              {deleting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Trash2 size={18} />
              )}

              {deleting ? "Deleting..." : "Delete"}
            </button>

          </div>
        </div>

        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-5">

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-primary" size={24} />

                  <span className="text-sm text-base-content/60">
                    Complaint #{complaint.id}
                  </span>
                </div>

                <h1 className="text-3xl font-bold">
                  {complaint.title}
                </h1>
              </div>

              <div>
                <span
                  className={`badge badge-lg ${
                    complaint.status === "resolved"
                      ? "badge-success"
                      : complaint.status === "pending"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>
            </div>

            {/* Complaint Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

              {/* Category */}
              <div className="flex items-center gap-3">
                <Tag className="text-primary" size={20} />

                <div>
                  <p className="text-sm text-base-content/60">
                    Category
                  </p>

                  <p className="font-semibold">
                    {complaint.category}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" size={20} />

                <div>
                  <p className="text-sm text-base-content/60">
                    Location
                  </p>

                  <p className="font-semibold">
                    {complaint.location}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3">
                <CalendarDays className="text-primary" size={20} />

                <div>
                  <p className="text-sm text-base-content/60">
                    Created At
                  </p>

                  <p className="font-semibold">
                    {complaint.created_at
                      ? new Date(
                          complaint.created_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <Clock className="text-primary" size={20} />

                <div>
                  <p className="text-sm text-base-content/60">
                    Status
                  </p>

                  <p className="font-semibold capitalize">
                    {complaint.status}
                  </p>
                </div>
              </div>

              {/* Submitted By */}
              {complaint.username && (
                <div className="flex items-center gap-3">
                  <User className="text-primary" size={20} />

                  <div>
                    <p className="text-sm text-base-content/60">
                      Submitted By
                    </p>

                    <p className="font-semibold">
                      {complaint.username}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-3">
                Description
              </h2>

              <div className="bg-base-200 rounded-xl p-5">
                <p className="leading-7 text-base-content/80">
                  {complaint.description}
                </p>
              </div>
            </div>

            {/* Image */}
            {complaint.image && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">
                  Complaint Image
                </h2>

                <img
                  src={complaint.image}
                  alt={complaint.title}
                  className="w-full max-h-125 object-cover rounded-xl"
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;