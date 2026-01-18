/**
 * Skills Section
 * Dynamically rendered technical and soft skills from API
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import SkillBar from "@/components/SkillBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { fetchSkills } from "@/libs/api";
import type { Skill } from "@/types";

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter skills by category from API
  const technicalSkills = skills.filter((s) => s.category === "TECHNICAL");
  const softSkills = skills.filter((s) => s.category === "SOFT");
  const frameworkSkills = skills.filter((s) => s.category === "FRAMEWORK");

  if (loading) return null;

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Skills"
          subtitle="Technologies I work with and competencies I've developed"
        />

        <div className="grid lg:grid-cols-1 gap-12 mb-12">
          {/* Technical Skills Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Technicals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {technicalSkills.length > 0 ? (
                  technicalSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SkillBar name={skill.name} level={skill.level} />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No technical skills listed.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Frameworks / Libraries Skills Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Libraries / Frameworks</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {frameworkSkills.length > 0 ? (
                  frameworkSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SkillBar name={skill.name} level={skill.level} />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No Frameworks / Libraries skills listed.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Soft Skills Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Professional Attributes
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {softSkills.length > 0 ? (
                softSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="text-center">
                      <CardContent className="pt-6 pb-6">
                        <h4 className="font-heading font-medium mb-4">{skill.name}</h4>
                        
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
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-sm">
                            {skill.level}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No soft skills listed.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;