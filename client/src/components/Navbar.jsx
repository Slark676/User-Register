import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg ">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        {" "}
        <h1 className="text-2xl font-bold">Tasks Manager </h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className=" font-bold"> {user.username}</li>
            <li className="hover:text-sky-600">
              <Link
                to="/task-new"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                NewTask
              </Link>
            </li>
            <li className="hover:text-sky-600">
              <Link to="/tasks" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Tasks
              </Link>
            </li>
            <li className="hover:text-sky-600">
              <Link
                to="/profile"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Profile
              </Link>
            </li>
            <li className="hover:text-sky-600">
              <Link
                to="/"
                onClick={() => logout()}
                className="bg-red-500 px-4 py-1 rounded-sm"
              >
                logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="hover:text-sky-600">
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li className="hover:text-sky-600">
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
