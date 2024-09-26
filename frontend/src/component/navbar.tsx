import React from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
const Navbar = () => {
  const [search, setSearch] = useState<string>("");
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  const { token, handleLogout, currentUser } = useAuth();
  return (
    <div className="flex flex-wrap justify-between items-center h-16 bg-white px-4">
      <Link to={"/"} className="h-full w-16">
        <img
          src="/KL.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </Link>
      <form
        className="flex-1 flex justify-center items-center max-w-md w-full"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full bg-gray-100 p-2 rounded-md md:rounded-l-md"
          onChange={handleSearchChange}
        />
      </form>
      <div className="flex space-x-4 p-2">
        <Link
          className="hidden md:block p-2"
          to="/"
          search={(prev) => ({ ...prev, pop: "location" })}
        >
          Location
        </Link>
        {token ? (
          <>
            <span className="p-2">
              Welcome, {currentUser?.fullname || "User"}
            </span>
            <Link className="p-2" to="/user/profile">
              Profile
            </Link>
            <button className="p-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="p-2" to="/authentication/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
