/**
 * Admin Social Links Management
 * Add, edit, and delete social media links
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Link as LinkIcon, Save, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import type { SocialLink } from "@/types";

const platformIcons: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
};

const getPlatformIcon = (platform: string) => {
  const key = platform.toLowerCase();
  return platformIcons[key] || Globe;
};

const emptySocialLink: SocialLink = {
  id: "",
  platform: "",
  url: "",
};

const AdminSocialLinks = () => {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState<SocialLink>(emptySocialLink);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ ...emptySocialLink, id: Date.now().toString() });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (link: SocialLink) => {
    setEditingItem(link);
    setFormData(link);
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (link: SocialLink) => {
    setEditingItem(link);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateSocialLink(formData);
        toast({ title: "Link updated", description: "The social link has been saved." });
      } else {
        await addSocialLink(formData);
        toast({ title: "Link added", description: "New social link has been created." });
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.warn("Failed to save social link", err);
      toast({
        title: "Error",
        description: "Failed to save link.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!editingItem) return;
    try {
      await deleteSocialLink(editingItem.id);
      toast({ title: "Link deleted", description: "The social link has been removed." });
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.warn("Failed to delete social link", err);
      toast({
        title: "Error",
        description: "Failed to delete link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Social Links</h1>
            <p className="text-muted-foreground mt-1">Manage your social media profiles</p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" /> Add Link
          </Button>
        </div>

        {/* Social Links List */}
        <div className="grid gap-3">
          <AnimatePresence>
            {socialLinks.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <LinkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No social links yet</p>
                  <Button onClick={handleOpenCreate} variant="outline" className="mt-4">
                    Add your first link
                  </Button>
                </CardContent>
              </Card>
            ) : (
              socialLinks.map((link) => {
                const IconComponent = getPlatformIcon(link.platform);
                return (
                  <motion.div key={link.platform} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Card>
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium">{link.platform}</p>
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent truncate block max-w-xs">
                                {link.url}
                              </a>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(link)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleOpenDelete(link)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Edit/Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Link" : "Add Link"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the social link details" : "Add a new social media link"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform Name</Label>
                <Input id="platform" placeholder="e.g., GitHub, LinkedIn" value={formData.platform} onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" placeholder="https://..." value={formData.url} onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}><Save className="h-4 w-4 mr-2" />{editingItem ? "Save Changes" : "Add Link"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Social Link?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your <strong>{editingItem?.platform}</strong> link. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default AdminSocialLinks;
