/**
 * Projects Page
 * Portfolio of projects with descriptions, technologies, and links
 */

import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  // Projects data
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with product management, shopping cart, secure checkout, and admin dashboard. Built with modern web technologies for optimal performance.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool featuring real-time updates, drag-and-drop interface, team collaboration, and progress tracking capabilities.",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Weather Dashboard",
      description:
        "An elegant weather application with location-based forecasts, interactive maps, severe weather alerts, and beautiful data visualizations.",
      technologies: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Social Media Dashboard",
      description:
        "A comprehensive social media analytics platform that aggregates data from multiple platforms, providing insights and scheduling capabilities.",
      technologies: ["Vue.js", "Python", "FastAPI", "MongoDB"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      githubUrl: "https://github.com",
    },
    {
      title: "AI Image Generator",
      description:
        "An AI-powered image generation application using machine learning models to create unique artwork from text descriptions.",
      technologies: ["Python", "TensorFlow", "React", "AWS Lambda"],
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=600&h=400&fit=crop",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Personal Finance Tracker",
      description:
        "A privacy-focused personal finance application with expense tracking, budgeting tools, and financial goal setting features.",
      technologies: ["React Native", "Node.js", "SQLite", "D3.js"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      githubUrl: "https://github.com",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto">
        <SectionHeader
          title="Projects"
          subtitle="A selection of my recent work and side projects"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-card border border-border rounded-2xl">
            <p className="font-body text-muted-foreground mb-2">
              Interested in seeing more?
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xl font-medium text-accent hover:underline"
            >
              View all projects on GitHub →
            </a>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Projects;
