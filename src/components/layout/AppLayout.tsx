import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "@/pages/Home";

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Home />
        </div>
      </div>
    </div>
  );
}
