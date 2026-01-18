import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import type { Profile } from "@/types";

const AdminProfile = () => {
  const { profile } = useAdmin();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Profile>({
    id: profile?.id ?? 0,
    fullName: profile?.fullName ?? "",
    title: profile?.title ?? "",
    shortIntro: profile?.shortIntro ?? "",
    biography: profile?.biography ?? "",
    careerObjective: profile?.careerObjective ?? "",
    profileImageUrl: profile?.profileImageUrl ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    location: profile?.location ?? "",
  });

  const [interests, setInterests] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [newHobby, setNewHobby] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests((prev) => [...prev, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(prev => prev.filter(i => i !== interestToRemove));
  };

  // Hobbies
  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setHobbies((prev) => [...prev, newHobby.trim()]);
      setNewHobby("");
    }
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    setHobbies((prev) => prev.filter(i => i !== hobbyToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Try again later.",
      });
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl space-y-6"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Your name and professional title</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortIntro">Short Introduction</Label>
                <Textarea
                  id="shortIntro"
                  name="shortIntro"
                  value={formData.shortIntro}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How visitors can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* About Me */}
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
              <CardDescription>Tell visitors about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="biography">Biography</Label>
                <Textarea
                  id="biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="careerObjective">Career Objectives</Label>
                <Textarea
                  id="careerObjective"
                  name="careerObjective"
                  value={formData.careerObjective}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests & Hobbies</CardTitle>
              <CardDescription>What you're passionate about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Interests */}
              <div className="space-y-3">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="gap-1">
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddInterest}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Hobbies */}
              <div className="space-y-3">
                <Label>Hobbies</Label>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby) => (
                    <Badge key={hobby} variant="secondary" className="gap-1">
                      {hobby}
                      <button
                        type="button"
                        onClick={() => handleRemoveHobby(hobby)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a hobby..."
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddHobby();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddHobby}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" variant="hero" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
