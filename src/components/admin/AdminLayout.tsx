/**
 * Admin Layout
 * Wrapper component for admin pages with sidebar
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden"> 
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
