import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { authUser, logout } = useContext(AuthContext);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/my-complaints"}>Your Complaints</Link>
              </li>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            CityConnect
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>
              <Link to={"/my-complaints"}>Your Complaints</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {authUser ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                {authUser.username}
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {
                authUser?.role == "admin" && (
                  <li>
                  <Link to={"/admin/all-complaints"}>dashboard</Link>
                </li>
                )}
                <li>
                  <Link to={"/profile"}>profile</Link>
                </li>
                <li>
                  <Link to={"/edit-password"}>Edit Password</Link>
                </li>
                <li>
                  <Link to={"/"} onClick={logout} className="btn">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
