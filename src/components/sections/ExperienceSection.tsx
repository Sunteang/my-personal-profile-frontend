/**
 * Experience Section
 * Work experience, internships, and volunteering activities
 */

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {
  // Experience data
  const experiences = [
    {
      type: "Full-time",
      title: "Junior Full Stack Developer",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      period: "Jan 2023 - Present",
      description:
        "Developing and maintaining web applications for enterprise clients.",
      responsibilities: [
        "Developed React-based frontend applications",
        "Built RESTful APIs using Node.js",
        "Participated in code reviews and agile ceremonies",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      type: "Internship",
      title: "Software Engineering Intern",
      company: "InnovateTech Labs",
      location: "Palo Alto, CA",
      period: "Jun 2022 - Dec 2022",
      description:
        "Contributed to machine learning platform development.",
      responsibilities: [
        "Assisted in developing ML pipeline components",
        "Created interactive data visualizations",
        "Wrote unit and integration tests",
      ],
      technologies: ["Python", "TensorFlow", "React"],
    },
    {
      type: "Volunteer",
      title: "Tech Mentor",
      company: "Code for Good Foundation",
      location: "Remote",
      period: "Jan 2021 - Present",
      description:
        "Mentoring underrepresented students in programming.",
      responsibilities: [
        "Mentored 10+ students in web development",
        "Created curriculum for beginner workshops",
        "Helped students prepare for interviews",
      ],
      technologies: ["HTML/CSS", "JavaScript", "React"],
    },
  ];

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "Full-time": return "default";
      case "Internship": return "secondary";
      case "Volunteer": return "outline";
      default: return "secondary";
    }
  };

  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and contributions"
        />

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
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
                  <h3 className="font-heading text-xl font-semibold mb-1">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-body font-medium text-accent">{exp.company}</span>
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
                        <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
