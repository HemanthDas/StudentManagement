import { Outlet } from "@tanstack/react-router";
import Navbar from "./component/navbar";

function App() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
