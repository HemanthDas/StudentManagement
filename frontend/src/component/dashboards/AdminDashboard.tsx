import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import UserAdding from "../dashboardComponents/userAdding";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const search = useSearch({
    select: (search) => search.pop,
  });

  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  const handleClick = () => {
    navigate({
      search: (prev) => ({ ...prev, pop: "adduser" }),
    });
  };

  if (search === "adduser") {
    return <UserAdding />;
  }

  return (
    <div className="w-full relative">
      <button onClick={handleClick}>Add User</button>
    </div>
  );
};

export default AdminDashboard;
