/**
 * Admin Skills Management
 * Add, edit, and delete skills with proficiency levels
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Wrench, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import type { Skill } from "@/types";

const emptySkill: Skill = {
  id: "",
  name: "",
  level: 50,
  category: "TECHNICAL",
};

const AdminSkills = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Skill>(emptySkill);

  // Group skills by category
  const technicalSkills = skills.filter((s) => s.category === "TECHNICAL");
  const softSkills = skills.filter((s) => s.category === "SOFT");
  const frameworkSkills = skills.filter((s) => s.category === "FRAMEWORK");

  const handleOpenCreate = (category: Skill["category"]) => {
    setEditingItem(null);
    setFormData({ ...emptySkill, id: Date.now().toString(), category });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingItem(skill);
    setFormData(skill);
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (skill: Skill) => {
    setEditingItem(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateSkill(formData);
        toast({ title: "Skill updated", description: "The skill has been saved." });
      } else {
        await addSkill(formData);
        toast({ title: "Skill added", description: "New skill has been created." });
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.warn("Failed to save skill", err);
      toast({
        title: "Error",
        description: "Failed to save skill.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!editingItem) return;
    try {
      await deleteSkill(editingItem.id);
      toast({ title: "Skill deleted", description: "The skill has been removed." });
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.warn("Failed to delete skill", err);
      toast({ title: "Error", description: "Failed to delete skill.", variant: "destructive" });
    }
  };

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{skill.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(skill)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleOpenDelete(skill)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} className="h-full bg-gradient-accent rounded-full" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground mt-1">Manage your skills by category</p>
        </div>

        <Tabs defaultValue="TECHNICAL" className="space-y-6">
          <TabsList>
            <TabsTrigger value="TECHNICAL">Technical Skills ({technicalSkills.length})</TabsTrigger>
            <TabsTrigger value="SOFT">Soft Skills ({softSkills.length})</TabsTrigger>
            <TabsTrigger value="FRAMEWORK">Frameworks ({frameworkSkills.length})</TabsTrigger>
          </TabsList>

          {/* Technical */}
          <TabsContent value="TECHNICAL" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenCreate("TECHNICAL")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Technical Skill
              </Button>
            </div>
            <div className="grid gap-3">
              <AnimatePresence>
                {technicalSkills.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No technical skills yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  technicalSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Soft */}
          <TabsContent value="SOFT" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenCreate("SOFT")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Soft Skill
              </Button>
            </div>
            <div className="grid gap-3">
              <AnimatePresence>
                {softSkills.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No soft skills yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  softSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Framework */}
          <TabsContent value="FRAMEWORK" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenCreate("FRAMEWORK")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Framework
              </Button>
            </div>
            <div className="grid gap-3">
              <AnimatePresence>
                {frameworkSkills.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No frameworks yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  frameworkSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit/Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Skill" : "Add Skill"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the skill details" : "Add a new skill to your portfolio"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., React, Communication"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Skill["category"]) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TECHNICAL">Technical</SelectItem>
                    <SelectItem value="SOFT">Soft Skill</SelectItem>
                    <SelectItem value="FRAMEWORK">Framework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Proficiency Level</Label>
                  <span className="text-sm font-medium">{formData.level}%</span>
                </div>
                <Slider
                  value={[formData.level]}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value[0] }))}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}><Save className="h-4 w-4 mr-2" />{editingItem ? "Save Changes" : "Add Skill"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Skill?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{editingItem?.name}</strong> from your skills. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default AdminSkills;
