import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminEducation from "@/pages/admin/AdminEducation";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminExperience from "@/pages/admin/AdminExperience";
import AdminSocialLinks from "@/pages/admin/AdminSocialLinks";
import AdminMessages from "@/pages/admin/AdminMessages";
import { useAdmin } from "@/contexts/AdminContext";

const AdminRoutes = () => {
  const { isAuthenticated } = useAdmin();

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="" element={<AdminLogin />} />

      {/* PROTECTED */}
      <Route
        element={
          isAuthenticated ? <AdminLayout /> : <Navigate to="/admin" replace />
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="education" element={<AdminEducation />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="experience" element={<AdminExperience />} />
        <Route path="social-links" element={<AdminSocialLinks />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
