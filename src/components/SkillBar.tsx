/**
 * Skill Bar Component
 * Visual indicator for skill proficiency levels
 */

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  color?: "accent" | "primary" | "muted";
}

const SkillBar = ({ name, level, color = "accent" }: SkillBarProps) => {
  const colorClasses = {
    accent: "bg-gradient-accent",
    primary: "bg-primary",
    muted: "bg-muted-foreground",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-body font-medium text-foreground">{name}</span>
        <span className="font-body text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClasses[color]}`}
        />
      </div>
    </div>
  );
};

export default SkillBar;
