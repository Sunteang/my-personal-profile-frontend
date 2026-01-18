/**
 * About Section
 * Personal background, career objectives, and biography fetched from API
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Target, Lightbulb } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProfile } from "@/libs/api";
import type { Profile } from "@/types";

const AboutSection = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const interests = [
    { icon: "💻", label: "Coding" },
    { icon: "☕", label: "Coffee" },
    { icon: "🎵", label: "Music" },
    { icon: "🎮", label: "Gaming" },
    { icon: "✈️", label: "Learning" },
  ];

  const values = [
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "I set clear objectives and work systematically to achieve them.",
    },
    {
      icon: Heart,
      title: "Passionate",
      description: "I love building software that solves real-world problems.",
    },
    {
      icon: Lightbulb,
      title: "Creative",
      description: "I find innovative solutions to complex technical challenges.",
    },
  ];

  if (loading) {
    return (
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="About Me"
            subtitle="Get to know me better - my background, aspirations, and what drives me"
          />
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          subtitle="Get to know me better - my background, aspirations, and what drives me"
        />

        {/* Biography (From API) */}
        {profile?.biography && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h3 className="font-heading text-2xl font-semibold mb-4 text-center">My Story</h3>
            <div className="font-body text-muted-foreground leading-relaxed text-center">
              <p>{profile.biography}</p>
            </div>
          </motion.div>
        )}

        {/* Career Objectives (From API) */}
        {profile?.careerObjective && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h3 className="font-heading text-2xl font-semibold mb-4 text-center">Career Objectives</h3>
            <div className="font-body text-muted-foreground leading-relaxed text-center p-6 bg-card rounded-2xl border border-border shadow-sm">
              <p className="italic text-foreground">
                "{profile.careerObjective}"
              </p>
            </div>
          </motion.div>
        )}

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-heading font-medium mb-2">{value.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interests & Hobbies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-heading text-2xl font-semibold mb-6">Interests & Hobbies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-3 bg-card rounded-full border border-border shadow-sm"
              >
                <span className="text-xl">{interest.icon}</span>
                <span className="font-body font-medium">{interest.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;