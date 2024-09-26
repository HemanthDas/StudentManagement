import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const router = createRouter({ routeTree });

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={auth} />;
}
export default InnerApp;
