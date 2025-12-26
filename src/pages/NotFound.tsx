import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-8xl md:text-9xl font-bold text-accent/20 mb-4">404</h1>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/"><Home className="h-5 w-5 mr-2" />Go Home</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
