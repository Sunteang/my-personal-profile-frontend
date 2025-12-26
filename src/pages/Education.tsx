/**
 * Education Page
 * Academic background, degrees, and achievements
 */

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Education = () => {
  // Education data
  const educationData = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2019 - 2023",
      description:
        "Focused on software engineering, algorithms, and human-computer interaction. Graduated with honors and completed a capstone project on machine learning applications in web development.",
      achievements: [
        "Dean's List - All Semesters",
        "GPA: 3.8/4.0",
        "Senior Thesis: AI-Powered Code Review System",
        "Computer Science Honor Society Member",
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Web Development",
        "Database Systems",
        "Machine Learning",
        "Software Engineering",
        "UI/UX Design",
      ],
    },
    {
      degree: "High School Diploma",
      institution: "Tech Preparatory Academy",
      location: "San Jose, CA",
      period: "2015 - 2019",
      description:
        "Specialized in STEM curriculum with advanced placement courses in Computer Science and Mathematics. Active member of the coding club and robotics team.",
      achievements: [
        "Valedictorian",
        "AP Scholar with Distinction",
        "Robotics Team Captain",
        "National Honor Society",
      ],
      coursework: [],
    },
  ];

  // Certifications
  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023",
    },
    {
      name: "Meta Frontend Developer Certificate",
      issuer: "Meta",
      year: "2023",
    },
    {
      name: "Google UX Design Certificate",
      issuer: "Google",
      year: "2022",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto">
        <SectionHeader
          title="Education"
          subtitle="My academic journey and continuous learning path"
        />

        {/* Education Timeline */}
        <div className="space-y-8 mb-16">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Left accent bar */}
                  <div className="w-full md:w-2 h-2 md:h-auto bg-gradient-to-b from-accent to-accent/50" />
                  
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl mb-2">{edu.degree}</CardTitle>
                          <CardDescription className="text-base">
                            <span className="font-medium text-foreground">{edu.institution}</span>
                          </CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Description */}
                      <p className="font-body text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>

                      {/* Achievements */}
                      {edu.achievements.length > 0 && (
                        <div>
                          <h4 className="font-heading font-medium mb-3 flex items-center gap-2">
                            <Award className="h-5 w-5 text-accent" />
                            Achievements
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {edu.achievements.map((achievement) => (
                              <li
                                key={achievement}
                                className="flex items-center gap-2 font-body text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Coursework */}
                      {edu.coursework.length > 0 && (
                        <div>
                          <h4 className="font-heading font-medium mb-3 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-accent" />
                            Relevant Coursework
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course) => (
                              <Badge key={course} variant="secondary">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-2xl font-semibold text-center mb-8">
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="font-heading font-medium mb-1">{cert.name}</h4>
                    <p className="font-body text-sm text-muted-foreground mb-2">
                      {cert.issuer}
                    </p>
                    <Badge variant="outline">{cert.year}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Education;
