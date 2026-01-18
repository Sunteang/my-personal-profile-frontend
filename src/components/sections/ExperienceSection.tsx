/**
 * Experience Section
 * Work experience and internships fetched from the backend
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { fetchExperiences } from "@/libs/api";
import type { Experience } from "@/types";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Map API "type" to UI variants
  const getTypeVariant = (type: string) => {
    switch (type) {
      case "JOB": return "default";
      case "INTERNSHIP": return "secondary";
      case "VOLUNTEER": return "outline";
      default: return "secondary";
    }
  };

  // Helper to format dates
  const formatDate = (dateString: string) => {
    if (dateString.toLowerCase() === "present") return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  if (loading) return null;

  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and contributions"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.role}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    {/* Header: Type and Date */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <Badge variant={getTypeVariant(exp.type)}>
                        {exp.type.replace("_", " ")}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>
                          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Role and Company */}
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl font-semibold mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-body font-bold text-accent text-lg">
                          {exp.company}
                        </span>
                        {/* Note: Your API screenshot shows location in Profile but not Experience, 
                            so we'll default to a placeholder or omit if preferred */}
                        <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground ml-2">
                          <MapPin className="h-3 w-3" />
                          <span>Phnom Penh, Cambodia</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative pl-6 border-l border-border/50">
                       <Briefcase className="absolute -left-3 top-0 h-6 w-6 p-1 bg-background border border-border rounded-full text-accent" />
                       <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10">No experience records found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;