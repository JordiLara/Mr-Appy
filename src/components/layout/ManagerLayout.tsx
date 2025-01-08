import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";

export default function ManagerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ManagerSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
