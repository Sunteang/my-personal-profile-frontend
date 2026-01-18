/**
 * Education Section
 * Dynamic academic background and certifications from API
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { fetchEducations, fetchCertifications } from "@/libs/api";
import type { Education, Certification } from "@/types";

const EducationSection = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchEducations(), fetchCertifications()])
      .then(([eduData, certData]) => {
        setEducations(eduData);
        setCertifications(certData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Education"
          subtitle="My academic journey and continuous learning path"
        />

        {/* Education Timeline */}
        <div className="space-y-6 mb-16">
          {educations.length > 0 ? (
            educations.map((edu, index) => (
              <motion.div
                key={`${edu.institutionName}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Decorative side bar */}
                    <div className="w-full md:w-2 h-2 md:h-auto bg-gradient-to-b from-accent to-accent/50" />
                    
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl mb-1">{edu.degree}</CardTitle>
                            <CardDescription className="text-base font-medium text-foreground">
                              {edu.institutionName}
                            </CardDescription>
                            <p className="text-sm text-accent font-medium mt-1">
                              {edu.fieldOfStudy}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.startYear} - {edu.endYear}</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex gap-3">
                          <BookOpen className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                          <p className="font-body text-muted-foreground leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No education data available.</p>
          )}
        </div>

        {/* Certifications - Only shows if there is data */}
        {certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-2xl font-semibold text-center mb-8">Certifications</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:border-accent/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <GraduationCap className="h-6 w-6 text-accent" />
                      </div>
                      <h4 className="font-heading font-bold text-lg mb-1">{cert.name}</h4>
                      <p className="font-body text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <Badge variant="secondary">{cert.year}</Badge>
                        {cert.credentialUrl && (
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline font-medium"
                          >
                            View Credential
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EducationSection;