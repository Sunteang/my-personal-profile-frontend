/**
 * Main Application Component
 * Single-page portfolio with smooth scrolling navigation and admin dashboard
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Context Providers
import { AdminProvider } from "@/contexts/AdminContext";

// Layout components
import SinglePageNav from "@/components/SinglePageNav";
import Footer from "@/components/Footer";
import AdminLayout from "@/components/admin/AdminLayout";

// Public Pages
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminEducation from "@/pages/admin/AdminEducation";
import AdminSkills from "@/pages/admin/AdminSkills";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminExperience from "@/pages/admin/AdminExperience";
import AdminSocialLinks from "@/pages/admin/AdminSocialLinks";
import AdminMessages from "@/pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Portfolio Routes */}
              <Route
                path="/"
                element={
                  <>
                    <SinglePageNav />
                    <Portfolio />
                    <Footer />
                  </>
                }
              />

              {/* Admin Login */}
              <Route path="/admin" element={<AdminLogin />} />

              {/* Admin Dashboard Routes (Protected) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="education" element={<AdminEducation />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="social-links" element={<AdminSocialLinks />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
