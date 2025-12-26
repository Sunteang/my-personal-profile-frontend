/**
 * Skills Section
 * Technical and soft skills with visual proficiency indicators
 */

import { motion } from "framer-motion";
import { Code, Palette, Database, Cloud, Users, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import SkillBar from "@/components/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkillsSection = () => {
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
      ],
    },
  ];

  // Soft skills
  const softSkills = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Agile methodologies and cross-functional teamwork",
      level: 95,
    },
    {
      icon: Zap,
      title: "Problem Solving",
      description: "Analytical thinking and creative solutions",
      level: 90,
    },
    {
      icon: Palette,
      title: "UI/UX Sensibility",
      description: "Strong eye for design and user experience",
      level: 85,
    },
  ];

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Skills"
          subtitle="Technologies I work with and competencies I've developed"
        />

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {technicalSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-base">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
        >
          <h3 className="font-heading text-2xl font-semibold text-center mb-6">Soft Skills</h3>
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
                  <CardContent className="pt-6 pb-6">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <skill.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h4 className="font-heading text-lg font-medium mb-1">{skill.title}</h4>
                    <p className="font-body text-sm text-muted-foreground mb-4">{skill.description}</p>
                    
                    {/* Circular progress indicator */}
                    <div className="relative w-16 h-16 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          className="text-secondary"
                          strokeWidth="5"
                          stroke="currentColor"
                          fill="transparent"
                          r="28"
                          cx="32"
                          cy="32"
                        />
                        <motion.circle
                          className="text-accent"
                          strokeWidth="5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="28"
                          cx="32"
                          cy="32"
                          initial={{ strokeDasharray: "0, 176" }}
                          whileInView={{ strokeDasharray: `${(skill.level / 100) * 176}, 176` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-heading font-semibold text-sm">
                        {skill.level}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
