import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminDashboard from "../component/dashboards/AdminDashboard";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/dashboard")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser?.role === "admin") {
      setRole("admin");
    }
    if (!localStorage.getItem("token")) {
      navigate({ to: "/authentication/login" });
    }
  }, []);
  console.log(role);
  if (role === "admin") {
    return <AdminDashboard />;
  }
  return (
    <div className="">
      <h3>Welcome Home!</h3>
    </div>
  );
}
