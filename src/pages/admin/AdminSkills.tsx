/**
 * Admin Skills Management
 * Add, edit, and delete skills with proficiency levels
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Wrench, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useAdmin, Skill } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const emptySkill: Skill = {
  id: "",
  name: "",
  level: 50,
  category: "technical",
};

const AdminSkills = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Skill>(emptySkill);

  const technicalSkills = skills.filter((s) => s.category === "technical");
  const softSkills = skills.filter((s) => s.category === "soft");

  const handleOpenCreate = (category: "technical" | "soft") => {
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

  const handleSubmit = () => {
    if (editingItem) {
      updateSkill(formData.id, formData);
      toast({ title: "Skill updated", description: "The skill has been saved." });
    } else {
      addSkill(formData);
      toast({ title: "Skill added", description: "New skill has been created." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingItem) {
      deleteSkill(editingItem.id);
      toast({ title: "Skill deleted", description: "The skill has been removed." });
    }
    setIsDeleteDialogOpen(false);
  };

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{skill.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{skill.level}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleOpenEdit(skill)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => handleOpenDelete(skill)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              className="h-full bg-gradient-accent rounded-full"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground mt-1">
            Manage your technical and soft skills
          </p>
        </div>

        {/* Skills Tabs */}
        <Tabs defaultValue="technical" className="space-y-6">
          <TabsList>
            <TabsTrigger value="technical">
              Technical Skills ({technicalSkills.length})
            </TabsTrigger>
            <TabsTrigger value="soft">
              Soft Skills ({softSkills.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenCreate("technical")}>
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
                  technicalSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="soft" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenCreate("soft")}>
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
                  softSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
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
                {editingItem
                  ? "Update the skill details"
                  : "Add a new skill to your portfolio"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., React, Communication"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: "technical" | "soft") =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft">Soft Skill</SelectItem>
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
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, level: value[0] }))
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                {editingItem ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Skill?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{editingItem?.name}</strong> from
                your skills. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default AdminSkills;
