/**
 * Page Layout Component
 * Wraps pages with consistent layout structure and animations
 */

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`min-h-screen pt-20 md:pt-24 pb-16 ${className}`}
    >
      {children}
    </motion.main>
  );
};

export default PageLayout;
