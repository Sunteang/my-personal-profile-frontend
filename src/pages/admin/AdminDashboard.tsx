/**
 * Admin Dashboard
 * Overview of portfolio content and quick stats
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  GraduationCap,
  Wrench,
  FolderOpen,
  Briefcase,
  MessageSquare,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";

const AdminDashboard = () => {
  const { profile, education, skills, projects, experiences, socialLinks, messages } = useAdmin();
  const unreadMessages = messages.filter((m) => !m.read).length;

  const stats = [
    {
      icon: User,
      label: "Profile",
      value: profile.fullName,
      description: "Your personal information",
      path: "/admin/profile",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: education.length,
      description: "Academic records",
      path: "/admin/education",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Wrench,
      label: "Skills",
      value: skills.length,
      description: "Technical & soft skills",
      path: "/admin/skills",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: FolderOpen,
      label: "Projects",
      value: projects.length,
      description: "Portfolio projects",
      path: "/admin/projects",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: experiences.length,
      description: "Work experience",
      path: "/admin/experience",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: LinkIcon,
      label: "Social Links",
      value: socialLinks.length,
      description: "Connected profiles",
      path: "/admin/social-links",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio content from this dashboard
          </p>
        </div>

        {/* Messages Alert */}
        {unreadMessages > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      You have {unreadMessages} unread message{unreadMessages > 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check your inbox to respond
                    </p>
                  </div>
                </div>
                <Button asChild>
                  <Link to="/admin/messages">
                    View Messages
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.path}>
                <Card className="hover:border-primary/20 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Messages</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/messages">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No messages yet
              </p>
            ) : (
              <div className="space-y-4">
                {messages.slice(0, 3).map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border ${
                      !message.read ? "bg-primary/5 border-primary/20" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{message.name}</p>
                          {!message.read && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.date}</p>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{message.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
