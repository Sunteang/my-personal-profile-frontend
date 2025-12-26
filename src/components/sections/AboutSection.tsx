/**
 * About Section
 * Personal background, career objectives, interests, and biography
 */

import { motion } from "framer-motion";
import { Heart, Target, Lightbulb } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  // Interests and hobbies data
  const interests = [
    { icon: "🎮", label: "Gaming" },
    { icon: "📚", label: "Reading" },
    { icon: "🎵", label: "Music" },
    { icon: "✈️", label: "Traveling" },
    { icon: "📷", label: "Photography" },
    { icon: "☕", label: "Coffee" },
  ];

  // Core values
  const values = [
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "I set clear objectives and work systematically to achieve them.",
    },
    {
      icon: Heart,
      title: "Passionate",
      description: "I love what I do and it shows in every project I undertake.",
    },
    {
      icon: Lightbulb,
      title: "Creative",
      description: "I find innovative solutions to complex problems.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          subtitle="Get to know me better - my background, aspirations, and what drives me"
        />

        {/* Biography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="font-heading text-2xl font-semibold mb-4 text-center">My Story</h3>
          <div className="font-body text-muted-foreground space-y-4 leading-relaxed text-center">
            <p>
              I'm a passionate full-stack developer with a deep love for creating 
              beautiful, functional web applications. My journey in tech started 
              during my university years when I built my first website, and I've 
              been hooked ever since.
            </p>
            <p>
              With a background in Computer Science and several years of hands-on 
              experience, I've developed a keen eye for design and a solid foundation 
              in both frontend and backend technologies. I believe that great software 
              is not just about code—it's about solving real problems for real people.
            </p>
          </div>
        </motion.div>

        {/* Career Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h3 className="font-heading text-2xl font-semibold mb-4 text-center">Career Objectives</h3>
          <div className="font-body text-muted-foreground leading-relaxed text-center">
            <p className="mb-4">
              My goal is to continue growing as a developer while making meaningful 
              contributions to innovative projects. I'm particularly interested in:
            </p>
            <ul className="inline-block text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Building scalable, user-centric applications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Exploring emerging technologies like AI and Web3
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Leading and mentoring development teams
              </li>
            </ul>
          </div>
        </motion.div>

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
