/**
 * Skills Page
 * Technical and soft skills with visual proficiency indicators
 */

import { motion } from "framer-motion";
import { Code, Palette, Database, Cloud, Users, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import SkillBar from "@/components/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Skills = () => {
  // Technical skills organized by category
  const technicalSkills = [
    {
      category: "Frontend Development",
      icon: Code,
      skills: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "HTML5 / CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 85 },
      ],
    },
    {
      category: "Backend Development",
      icon: Database,
      skills: [
        { name: "Node.js / Express", level: 85 },
        { name: "Python / Django", level: 75 },
        { name: "PostgreSQL / MongoDB", level: 80 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 70 },
      ],
    },
    {
      category: "Tools & Platforms",
      icon: Cloud,
      skills: [
        { name: "Git / GitHub", level: 95 },
        { name: "AWS / Vercel", level: 80 },
        { name: "Docker", level: 70 },
        { name: "Figma", level: 85 },
        { name: "VS Code", level: 95 },
      ],
    },
  ];

  // Soft skills
  const softSkills = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Experienced in agile methodologies and cross-functional teamwork",
      level: 95,
    },
    {
      icon: Zap,
      title: "Problem Solving",
      description: "Analytical thinking and creative solutions for complex challenges",
      level: 90,
    },
    {
      icon: Palette,
      title: "UI/UX Sensibility",
      description: "Strong eye for design and user experience optimization",
      level: 85,
    },
  ];

  // Tools/Technologies as icons
  const toolLogos = [
    "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
    "MongoDB", "AWS", "Docker", "Git", "Figma",
  ];

  return (
    <PageLayout>
      <div className="container mx-auto">
        <SectionHeader
          title="Skills"
          subtitle="Technologies I work with and competencies I've developed"
        />

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {technicalSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <SkillBar name={skill.name} level={skill.level} />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl font-semibold text-center mb-8">
            Soft Skills
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <skill.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h4 className="font-heading text-xl font-medium mb-2">
                      {skill.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground mb-4">
                      {skill.description}
                    </p>
                    {/* Circular progress indicator */}
                    <div className="relative w-20 h-20 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          className="text-secondary"
                          strokeWidth="6"
                          stroke="currentColor"
                          fill="transparent"
                          r="34"
                          cx="40"
                          cy="40"
                        />
                        <motion.circle
                          className="text-accent"
                          strokeWidth="6"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="34"
                          cx="40"
                          cy="40"
                          initial={{ strokeDasharray: "0, 214" }}
                          whileInView={{ strokeDasharray: `${(skill.level / 100) * 214}, 214` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-heading font-semibold text-lg">
                        {skill.level}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-heading text-2xl font-semibold mb-6">
            Technologies I Use
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {toolLogos.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-3 bg-card border border-border rounded-xl font-body font-medium shadow-sm hover:shadow-md transition-all duration-300"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Skills;
