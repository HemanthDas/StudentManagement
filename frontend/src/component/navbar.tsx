import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
const Navbar = () => {
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

      <div className="flex space-x-4 p-2">
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
