import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Navigation = () => {
  const { currentUser: user, logout } = useAuth();

  return (
    <div>
      <div className="navbar bg-base-100 px-10 shadow-md z-30 sticky">
        <div className="flex-1">
          <Link to="/">
            <span className="btn btn-ghost no-animation normal-case text-xl">
              Dynamic Quiz System
            </span>
          </Link>
        </div>
        <div className="flex-none">
          {!user ? (
            <div>
              <Link to="/login">
                <span className="btn btn-sm btn-outline btn-primary no-animation normal-case text-lg">
                  Login
                </span>
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex="0"
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>{user?.displayName?.slice(0, 2)}</span>
                </div>
              </label>
              <ul
                tabindex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <span
                    onClick={() => {
                      logout();
                    }}
                    className="justify-between"
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
