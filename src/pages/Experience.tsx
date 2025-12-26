/**
 * Experience Page
 * Work experience, internships, and volunteering activities
 */

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Experience = () => {
  // Experience data
  const experiences = [
    {
      type: "Full-time",
      title: "Junior Full Stack Developer",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      period: "Jan 2023 - Present",
      description:
        "Working on developing and maintaining web applications for enterprise clients. Collaborating with cross-functional teams to deliver high-quality software solutions.",
      responsibilities: [
        "Developed and maintained React-based frontend applications",
        "Built RESTful APIs using Node.js and Express",
        "Implemented database schemas and optimized queries",
        "Participated in code reviews and agile ceremonies",
        "Mentored junior team members and interns",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    },
    {
      type: "Internship",
      title: "Software Engineering Intern",
      company: "InnovateTech Labs",
      location: "Palo Alto, CA",
      period: "Jun 2022 - Dec 2022",
      description:
        "Contributed to the development of a machine learning platform, gaining hands-on experience with modern development practices and tools.",
      responsibilities: [
        "Assisted in developing ML pipeline components",
        "Created interactive data visualizations",
        "Wrote unit and integration tests",
        "Participated in sprint planning and daily standups",
      ],
      technologies: ["Python", "TensorFlow", "React", "Docker"],
    },
    {
      type: "Part-time",
      title: "Web Developer",
      company: "University IT Department",
      location: "Stanford, CA",
      period: "Sep 2021 - May 2022",
      description:
        "Maintained and enhanced university web applications while balancing academic responsibilities.",
      responsibilities: [
        "Updated and maintained department websites",
        "Developed internal tools for staff productivity",
        "Provided technical support and training",
        "Documented technical processes and procedures",
      ],
      technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
    },
    {
      type: "Volunteer",
      title: "Tech Mentor",
      company: "Code for Good Foundation",
      location: "Remote",
      period: "Jan 2021 - Present",
      description:
        "Volunteering as a mentor to help underrepresented students learn programming and pursue careers in technology.",
      responsibilities: [
        "Mentored 10+ students in web development",
        "Created curriculum for beginner coding workshops",
        "Reviewed student projects and provided feedback",
        "Helped students prepare for technical interviews",
      ],
      technologies: ["HTML/CSS", "JavaScript", "React", "Python"],
    },
  ];

  // Get badge variant based on experience type
  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Full-time":
        return "default";
      case "Internship":
        return "secondary";
      case "Part-time":
        return "outline";
      case "Volunteer":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and contributions"
        />

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-8 w-4 h-4 rounded-full bg-accent border-4 border-background shadow hidden md:block ${
                    index % 2 === 0 ? "right-0 translate-x-1/2 md:-right-2" : "left-0 -translate-x-1/2 md:-left-2"
                  }`}
                />

                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <Badge variant={getTypeVariant(exp.type)}>{exp.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Title and Company */}
                    <h3 className="font-heading text-xl font-semibold mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-body font-medium text-accent">
                        {exp.company}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="font-heading font-medium text-sm mb-2 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-accent" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="font-body text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-body font-medium hover:shadow-md transition-all duration-300"
          >
            <ExternalLink className="h-5 w-5 text-accent" />
            View Full Profile on LinkedIn
          </a>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Experience;
