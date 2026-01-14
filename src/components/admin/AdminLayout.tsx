/**
 * Admin Layout
 * Wrapper component for admin pages with sidebar
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { isAuthenticated } = useAdmin();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
