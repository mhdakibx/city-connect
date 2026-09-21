
import { useContext, useEffect, useState } from "react";
import {
  FileText,
  CalendarDays,
  Eye,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { baseurl } from "../services/baseUrl";

const UserAllComplaints = () => {
  const { accessToken } = useContext(AuthContext);

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await fetch(`${baseurl}/complaints/my`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.detail || "Failed to load complaints");
          return;
        }

        setComplaints(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getComplaints();
    }
  }, [accessToken]);

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

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

      setComplaints((prev) =>
        prev.filter((complaint) => complaint.id !== id)
      );

      toast.success("Complaint deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Resolved") {
      return "badge badge-success badge-sm";
    }

    if (status === "In Progress") {
      return "badge badge-warning badge-sm";
    }

    if (status === "Rejected") {
      return "badge badge-error badge-sm";
    }

    return "badge badge-info badge-sm";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <FileText size={22} />
              </div>

              <h1 className="text-2xl font-bold md:text-3xl">
                My Complaints
              </h1>
            </div>

            <p className="text-sm text-base-content/60">
              Track and manage all your submitted complaints.
            </p>
          </div>

          <Link
            to="/create-complaint"
            className="btn btn-primary gap-2"
          >
            <Plus size={18} />
            New Complaint
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Total */}
          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <p className="text-sm text-base-content/60">
                Total Complaints
              </p>

              <h2 className="text-2xl font-bold">
                {complaints.length}
              </h2>
            </div>
          </div>

          {/* Pending */}
          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <p className="text-sm text-base-content/60">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-info">
                {
                  complaints.filter(
                    (complaint) => complaint.status === "Pending"
                  ).length
                }
              </h2>
            </div>
          </div>

          {/* In Progress */}
          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <p className="text-sm text-base-content/60">
                In Progress
              </p>

              <h2 className="text-2xl font-bold text-warning">
                {
                  complaints.filter(
                    (complaint) => complaint.status === "In Progress"
                  ).length
                }
              </h2>
            </div>
          </div>

          {/* Resolved */}
          <div className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <p className="text-sm text-base-content/60">
                Resolved
              </p>

              <h2 className="text-2xl font-bold text-success">
                {
                  complaints.filter(
                    (complaint) => complaint.status === "Resolved"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        {/* Complaints */}
        <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm">

          {/* Table Header */}
          <div className="border-b border-base-300 px-5 py-4">
            <h2 className="text-lg font-semibold">
              All Complaints
            </h2>

            <p className="text-sm text-base-content/60">
              Recently submitted complaints
            </p>
          </div>

          {/* Empty State */}
          {complaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                <FileText size={32} />
              </div>

              <h3 className="text-lg font-semibold">
                No Complaints Found
              </h3>

              <p className="mt-1 text-sm text-base-content/60">
                You have not submitted any complaints yet.
              </p>

              <Link
                to="/create-complaint"
                className="btn btn-primary mt-5 gap-2"
              >
                <Plus size={18} />
                Create Complaint
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="table">

                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Complaint</th>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Details</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {complaints.map((complaint, index) => (
                      <tr
                        key={complaint.id}
                        className="hover"
                      >

                        {/* No. */}
                        <td>
                          <span className="font-semibold text-primary">
                            {index + 1}
                          </span>
                        </td>

                        {/* Complaint */}
                        <td>
                          <div>
                            <p className="font-semibold">
                              {complaint.title}
                            </p>

                            <p className="text-xs text-base-content/50">
                              {complaint.category}
                            </p>
                          </div>
                        </td>

                        {/* ID */}
                        <td>
                          <span className="font-mono text-sm">
                            #{complaint.id}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={getStatusClass(
                              complaint.status
                            )}
                          >
                            {complaint.status}
                          </span>
                        </td>

                        {/* Date */}
                        <td>
                          <div className="flex items-center gap-1 text-sm text-base-content/60">
                            <CalendarDays size={15} />

                            {formatDate(
                              complaint.created_at
                            )}
                          </div>
                        </td>

                        {/* Full Details */}
                        <td>
                          <Link
                            to={`/complaints/${complaint.id}`}
                            className="btn btn-sm btn-outline btn-primary gap-2"
                          >
                            <Eye size={16} />
                            Details
                          </Link>
                        </td>

                        {/* Edit */}
                        <td>
                          <Link
                            to={`/complaints/edit/${complaint.id}`}
                            className="btn btn-sm btn-outline btn-warning gap-2"
                          >
                            <Pencil size={16} />
                            Edit
                          </Link>
                        </td>

                        {/* Delete */}
                        <td>
                          <button
                            onClick={() =>
                              deleteComplaint(complaint.id)
                            }
                            disabled={deletingId === complaint.id}
                            className="btn btn-sm btn-outline btn-error gap-2"
                          >
                            {deletingId === complaint.id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <Trash2 size={16} />
                            )}

                            {deletingId === complaint.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-3 p-4 md:hidden">

                {complaints.map((complaint, index) => (
                  <div
                    key={complaint.id}
                    className="rounded-xl border border-base-300 p-4"
                  >

                    {/* Top */}
                    <div className="mb-3 flex items-start justify-between gap-3">

                      <div>
                        <div className="mb-1 flex items-center gap-2">

                          {/* No. */}
                          <span className="text-xs font-semibold text-primary">
                            No. {index + 1}
                          </span>

                          {/* ID */}
                          <span className="text-xs text-base-content/50">
                            ID: #{complaint.id}
                          </span>

                        </div>

                        <h3 className="font-semibold">
                          {complaint.title}
                        </h3>

                        <p className="mt-1 text-xs text-base-content/50">
                          {complaint.category}
                        </p>
                      </div>

                      <span
                        className={getStatusClass(
                          complaint.status
                        )}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      <CalendarDays size={15} />

                      {formatDate(
                        complaint.created_at
                      )}
                    </div>

                    {/* Full Details */}
                    <Link
                      to={`/complaints/${complaint.id}`}
                      className="btn btn-sm btn-outline btn-primary mt-4 w-full gap-2"
                    >
                      <Eye size={16} />
                      See Full Details
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/complaints/edit/${complaint.id}`}
                      className="btn btn-sm btn-outline btn-warning mt-2 w-full gap-2"
                    >
                      <Pencil size={16} />
                      Edit Complaint
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteComplaint(complaint.id)
                      }
                      disabled={deletingId === complaint.id}
                      className="btn btn-sm btn-outline btn-error mt-2 w-full gap-2"
                    >
                      {deletingId === complaint.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <Trash2 size={16} />
                      )}

                      {deletingId === complaint.id
                        ? "Deleting..."
                        : "Delete Complaint"}
                    </button>

                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserAllComplaints;

