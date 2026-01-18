/**
 * Projects Section
 * Fetches and displays portfolio projects from the backend API
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { fetchProjects } from "@/libs/api";
import type { Project } from "@/types";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Projects"
          subtitle="A selection of my recent work and side projects"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Mapping API fields to ProjectCard props */}
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  image={project.imageUrl}
                  githubUrl={project.githubUrl || undefined}
                  liveUrl={project.demoUrl || undefined}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground font-body">
              No projects found. Check back soon!
            </div>
          )}
        </div>

        {/* Dynamic GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 bg-card border border-border rounded-2xl">
            <p className="font-body text-muted-foreground mb-2">
              Interested in seeing more?
            </p>
            <a
              href="https://github.com/Sunteang"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-lg font-medium text-accent hover:underline"
            >
              View my GitHub Profile →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;