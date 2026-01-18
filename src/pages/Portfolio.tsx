/**
 * Single Page Portfolio
 * All sections combined into one scrollable page
 */

import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title>Sunteang Serey</title>
        <meta
          name="description"
          content="Personal portfolio of Sunteang Serey, a Full Stack Developer specializing in React, TypeScript, and modern web technologies. View my projects, skills, and experience."
        />
        <meta name="keywords" content="full stack developer, web developer, react, typescript, portfolio" />
      </Helmet>
      
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Portfolio;
