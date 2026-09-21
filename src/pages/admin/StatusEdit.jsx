
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/baseUrl";

const StatusEdit = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);

  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getComplaint = async () => {
    if (!accessToken || !id) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${baseurl}/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      console.log("Complaint Details:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to load complaint"
        );
      }

      setComplaint(data);
      setStatus(data.status || "Pending");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComplaint();
  }, [accessToken, id]);

  const handleUpdateStatus = async () => {
    if (!status) {
      toast.error("Please select a status");
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch(
        `${baseurl}/admin/complaints/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to update status"
        );
      }

      toast.success(
        "Complaint status updated successfully"
      );

      setComplaint((prev) => ({
        ...prev,
        status: status,
      }));
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Complaint not found
        </h2>

        <Link
          to="/admin/complaints"
          className="btn btn-primary mt-4"
        >
          Back to Complaints
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/all-complaints"
          className="btn btn-sm btn-ghost"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">
            Complaint Details
          </h1>

          <p className="text-base-content/60 mt-1">
            View complaint information and update status
          </p>
        </div>
      </div>

      {/* User Information */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">

          <h2 className="card-title mb-4">
            User Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <p className="text-sm text-base-content/60">
                User ID
              </p>
              <p className="font-semibold">
                {complaint.user_id || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Email
              </p>
              <p className="font-semibold">
                {complaint.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Username
              </p>
              <p className="font-semibold">
                {complaint.username || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Name
              </p>
              <p className="font-semibold">
                {complaint.firstname || ""}
                {" "}
                {complaint.lastname || ""}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Complaint Information */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">

          <h2 className="card-title mb-4">
            Complaint Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <p className="text-sm text-base-content/60">
                Complaint ID
              </p>

              <p className="font-semibold">
                {complaint.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Category
              </p>

              <p className="font-semibold">
                {complaint.category || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Title
              </p>

              <p className="font-semibold">
                {complaint.title || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Location
              </p>

              <p className="font-semibold">
                {complaint.location || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Created At
              </p>

              <p className="font-semibold">
                {complaint.created_at
                  ? new Date(
                      complaint.created_at
                    ).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/60">
                Current Status
              </p>

              <span className="badge badge-outline">
                {complaint.status || "N/A"}
              </span>
            </div>

          </div>

          {/* Description */}
          <div className="mt-5">
            <p className="text-sm text-base-content/60">
              Description
            </p>

            <div className="bg-base-200 rounded-lg p-4 mt-2">
              {complaint.description || "No description"}
            </div>
          </div>

        </div>
      </div>

      {/* Update Status */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">

          <h2 className="card-title">
            Update Complaint Status
          </h2>

          <p className="text-sm text-base-content/60">
            Select a new status for this complaint.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="select select-bordered w-full sm:w-auto"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

            <button
              onClick={handleUpdateStatus}
              disabled={updating}
              className="btn btn-primary"
            >
              {updating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Status"
              )}
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default StatusEdit;
