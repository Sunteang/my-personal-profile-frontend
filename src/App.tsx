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
import AdminRoutes from "@/pages/admin/AdminRoutes";

// Layout components
import SinglePageNav from "@/components/SinglePageNav";
import Footer from "@/components/Footer";

// Public Pages
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* PUBLIC SITE */}
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

            {/* ADMIN AREA */}
            <Route
              path="/admin/*"
              element={
                <AdminProvider>
                  <AdminRoutes />
                </AdminProvider>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
