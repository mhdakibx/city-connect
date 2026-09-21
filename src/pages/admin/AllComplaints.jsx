import { useContext, useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/baseUrl";

const AllComplaints = () => {
  const { accessToken } = useContext(AuthContext);

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [total, setTotal] = useState(0);

  const getComplaints = async () => {
    if (!accessToken) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (status) {
        params.append("status", status);
      }

      if (category) {
        params.append("category", category);
      }

      if (sort) {
        params.append("sort", sort);
      }

      params.append("page", page);
      params.append("limit", limit);

      const url = `${baseurl}/admin/complaints?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to load complaints"
        );
      }

      if (Array.isArray(data)) {
        setComplaints(data);
        setTotal(data.length);
      } else {
        setComplaints(data.complaints || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong"
      );
      setComplaints([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComplaints();
  }, [accessToken, page, status, category, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getComplaints();
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setCategory("");
    setSort("");
    setPage(1);
  };

  const handleDelete = async (complaintId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) {
      return;
    }

    setDeleteLoading(complaintId);

    try {
      const response = await fetch(
        `${baseurl}/admin/complaints/${complaintId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to delete complaint"
        );
      }

      toast.success("Complaint deleted successfully");

      setComplaints((prev) =>
        prev.filter(
          (complaint) => complaint.id !== complaintId
        )
      );

      setTotal((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to delete complaint"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full space-y-5 sm:space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          All Complaints
        </h1>

        <p className="text-sm sm:text-base text-base-content/60 mt-1">
          Manage all citizen complaints
        </p>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow">
        <div className="card-body p-4 sm:p-5 lg:p-6">

          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >

            {/* Search */}
            <div className="join w-full sm:col-span-2 lg:col-span-2">
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search complaints..."
                className="input input-bordered join-item w-full min-w-0"
              />

              <button
                type="submit"
                className="btn btn-primary join-item px-4"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="select select-bordered w-full"
            >
              <option value="">
                All Status
              </option>

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

            {/* Category */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="select select-bordered w-full"
            >
              <option value="">
                All Categories
              </option>

              <option value="Road">
                Road
              </option>

              <option value="Water">
                Water
              </option>

              <option value="Electricity">
                Electricity
              </option>

              <option value="Waste">
                Waste
              </option>

              <option value="Drainage">
                Drainage
              </option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="select select-bordered w-full"
            >
              <option value="">
                Sort
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="title">
                Title
              </option>
            </select>

          </form>

          {/* Clear */}
          {(search || status || category || sort) && (
            <div className="mt-3">
              <button
                onClick={clearFilters}
                className="btn btn-sm btn-ghost"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Complaints */}
      <div className="card bg-base-100 shadow overflow-hidden">
        <div className="card-body p-0">

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-16 sm:py-20 px-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                No complaints found
              </h3>

              <p className="text-sm sm:text-base text-base-content/60 mt-2">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table min-w-175">

                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id}>

                      {/* Title */}
                      <td className="max-w-65">
                        <div className="font-semibold truncate">
                          {complaint.title}
                        </div>

                        <div className="text-xs text-base-content/60">
                          ID: {complaint.id}
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="whitespace-nowrap">
                          {complaint.category || "N/A"}
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className="badge badge-outline whitespace-nowrap">
                          {complaint.status || "N/A"}
                        </span>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="whitespace-nowrap">
                          {complaint.created_at
                            ? new Date(
                                complaint.created_at
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex justify-center gap-2">

                          {/* View */}
                          <Link
                            to={`/admin/edit-status/${complaint.id}`}
                            className="btn btn-sm btn-square btn-info"
                            title="View Details"
                          >
                            <Eye size={17} />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(complaint.id)
                            }
                            disabled={
                              deleteLoading === complaint.id
                            }
                            className="btn btn-sm btn-square btn-error"
                            title="Delete"
                          >
                            {deleteLoading === complaint.id ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && complaints.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t">

              <p className="text-sm text-base-content/60">
                Page {page}
                {totalPages > 0 &&
                  ` of ${totalPages}`}
              </p>

              <div className="join">

                <button
                  className="btn btn-sm join-item"
                  disabled={page === 1}
                  onClick={() =>
                    setPage(page - 1)
                  }
                >
                  <ChevronLeft size={17} />
                  <span className="hidden xs:inline sm:inline">
                    Previous
                  </span>
                </button>

                <button
                  className="btn btn-sm join-item"
                  disabled={
                    totalPages === 0 ||
                    page >= totalPages
                  }
                  onClick={() =>
                    setPage(page + 1)
                  }
                >
                  <span className="hidden xs:inline sm:inline">
                    Next
                  </span>
                  <ChevronRight size={17} />
                </button>

              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default AllComplaints;
