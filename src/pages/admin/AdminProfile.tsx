/**
 * Admin Profile Management
 * Edit personal information and bio
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, X, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAdmin, Profile } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const AdminProfile = () => {
  const { profile, updateProfile } = useAdmin();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Profile>(profile);
  const [newInterest, setNewInterest] = useState("");
  const [newHobby, setNewHobby] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()],
      }));
      setNewHobby("");
    }
  };

  const handleRemoveHobby = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
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
                <Label htmlFor="introduction">Short Introduction</Label>
                <Textarea
                  id="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
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
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">Career Objectives</Label>
                <Textarea
                  id="objectives"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Interests & Hobbies */}
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
                  {formData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(index)}
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
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInterest())}
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
                  {formData.hobbies.map((hobby, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {hobby}
                      <button
                        type="button"
                        onClick={() => handleRemoveHobby(index)}
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
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHobby())}
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
