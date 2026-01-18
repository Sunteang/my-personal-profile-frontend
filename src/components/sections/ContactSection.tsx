import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  CheckCircle,
  Globe,
} from "lucide-react";
import { z } from "zod";
import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile, fetchSocialLinks, sendContactMessage } from "@/libs/api";
import type { Profile, SocialLink, ContactMessageRequest } from "@/types";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<ContactMessageRequest>>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactMessageRequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchProfile().then(setProfile).catch(console.error);
    fetchSocialLinks().then(setSocials).catch(console.error);
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return Github;
      case "linkedin":
        return Linkedin;
      case "facebook":
        return Facebook;
      case "twitter":
        return Twitter;
      default:
        return Globe;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ContactMessageRequest]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<ContactMessageRequest> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactMessageRequest;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactMessage(result.data as ContactMessageRequest);

      setIsSubmitted(true);
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Get in Touch"
          subtitle="Let's build something amazing together!"
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left side: Contact info and socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {profile && (
              <>
                <ContactItem icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
                <ContactItem icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />
                <ContactItem icon={MapPin} label="Location" value={profile.location} />
              </>
            )}

            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card>
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">Your message has been received.</p>
                    <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                      Send another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name ?? ""}
                        onChange={handleChange}
                        className={errors.name ? "border-destructive" : ""}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email ?? ""}
                        onChange={handleChange}
                        className={errors.email ? "border-destructive" : ""}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={4}
                        value={formData.message ?? ""}
                        onChange={handleChange}
                        className={errors.message ? "border-destructive" : ""}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon: Icon, label, value, href }: any) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
      <Icon className="h-5 w-5 text-accent" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      {href ? (
        <a href={href} className="font-medium hover:text-accent transition-colors">{value}</a>
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  </div>
);

export default ContactSection;
