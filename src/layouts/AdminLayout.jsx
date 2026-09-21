import React from "react";
import { Link, Outlet } from "react-router";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TfiHome } from "react-icons/tfi";

const AdminLayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle inline"
        />

        <div className="drawer-content">
          {/* Navbar */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          {/* Page content here */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">

            {/* Sidebar content */}
            <ul className="menu w-full grow">

              {/* All Complaints */}
              <li>
                <Link
                  to="/admin/all-complaints"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Complaints"
                >
                  <MdOutlineManageAccounts />

                  <span className="is-drawer-close:hidden">
                    All Complaints
                  </span>
                </Link>
              </li>

              {/* Home */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  <TfiHome />

                  <span className="is-drawer-close:hidden">
                    Home
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
