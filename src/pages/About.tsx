/**
 * About Page
 * Personal background, career objectives, interests, and biography
 */

import { motion } from "framer-motion";
import { Heart, Target, User, Lightbulb } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import profilePhoto from "@/assets/profile-photo.jpg";

const About = () => {
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
    <PageLayout>
      <div className="container mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="Get to know me better - my background, aspirations, and what drives me"
        />

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Photo and quick info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              {/* Profile photo */}
              <div className="relative mb-6">
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={profilePhoto}
                    alt="Alex Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative corner accent */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
              </div>

              {/* Quick info card */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Name</p>
                      <p className="font-heading font-medium">Alex Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-body text-sm text-muted-foreground">Role</p>
                      <p className="font-heading font-medium">Full Stack Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Biography content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Biography */}
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-4">My Story</h3>
              <div className="font-body text-muted-foreground space-y-4 leading-relaxed">
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
                <p>
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open-source projects, or sharing my knowledge through 
                  blog posts and mentoring aspiring developers.
                </p>
              </div>
            </div>

            {/* Career Objectives */}
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-4">Career Objectives</h3>
              <div className="font-body text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  My goal is to continue growing as a developer while making meaningful 
                  contributions to innovative projects. I'm particularly interested in:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Building scalable, user-centric applications</li>
                  <li>Exploring emerging technologies like AI and Web3</li>
                  <li>Leading and mentoring development teams</li>
                  <li>Contributing to products that make a positive impact</li>
                </ul>
              </div>
            </div>

            {/* Core Values */}
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6">What Drives Me</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="pt-6 text-center">
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
            </div>
          </motion.div>
        </div>

        {/* Interests & Hobbies Section */}
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
    </PageLayout>
  );
};

export default About;
