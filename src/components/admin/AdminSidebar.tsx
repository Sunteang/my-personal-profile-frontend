/**
 * Admin Sidebar Navigation
 * Navigation menu for admin dashboard sections
 */

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Wrench,
  FolderOpen,
  Briefcase,
  Link as LinkIcon,
  MessageSquare,
  LogOut,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: User, label: "Profile", path: "/admin/profile" },
  { icon: GraduationCap, label: "Education", path: "/admin/education" },
  { icon: Wrench, label: "Skills", path: "/admin/skills" },
  { icon: FolderOpen, label: "Projects", path: "/admin/projects" },
  { icon: Briefcase, label: "Experience", path: "/admin/experience" },
  { icon: LinkIcon, label: "Social Links", path: "/admin/social-links" },
  { icon: MessageSquare, label: "Messages", path: "/admin/messages" },
];

const AdminSidebar = () => {
  const { logout, messages } = useAdmin();
  const navigate = useNavigate();
  const unreadCount = messages.filter((m) => !m.read).length;

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-card border-r border-border h-full flex flex-col flex-shrink-0"
    >
      <div className="p-6 border-b border-border flex-shrink-0">
        <h2 className="font-heading text-xl font-semibold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">Content Management</p>
      </div>

      <nav className="flex-1 overflow-auto p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-body">{item.label}</span>
            {item.label === "Messages" && unreadCount > 0 && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border flex-shrink-0 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          View Portfolio
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
