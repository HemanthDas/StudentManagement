import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate({ to: "/authentication/login" });
    }
  }, []);
  return (
    <div className="">
      <h3>Welcome Home!</h3>
    </div>
  );
}
