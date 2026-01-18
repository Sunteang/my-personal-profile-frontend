import { useEffect, useState } from "react";
import { Github, Linkedin, Facebook, Twitter, Globe, Mail } from "lucide-react";
import { fetchProfile, fetchSocialLinks } from "@/libs/api";
import type { Profile, SocialLink } from "@/types";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socials, setSocials] = useState<SocialLink[]>([]);


  useEffect(() => {
    fetchProfile().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProfile(data[0]);
      } else if (data && !Array.isArray(data)) {
        setProfile(data);
      }
    }).catch(console.error);

    fetchSocialLinks().then(setSocials).catch(console.error);
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return Github;
      case "linkedin": return Linkedin;
      case "facebook": return Facebook;
      case "twitter": return Twitter;
      default: return Globe;
    }
  };

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <button
              onClick={() => globalThis.location.href='/admin'}
              className="font-heading font-semibold text-lg mb-1 flex items-center gap-2 justify-center md:justify-start cursor-default select-none">
              {profile?.fullName || "Portfolio"}
              
            </button>
            <p className="font-body text-sm text-muted-foreground">
              © {currentYear} All rights reserved. Built with React & Spring Boot.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            )}

            {socials.map((link) => {
              const Icon = getSocialIcon(link.platform);
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all"
                  aria-label={link.platform}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;