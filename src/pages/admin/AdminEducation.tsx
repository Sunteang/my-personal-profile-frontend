/**
 * Admin Education Management
 * Add, edit, and delete education records
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, GraduationCap, X, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { useAdmin, Education } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const emptyEducation: Education = {
  id: "",
  institution: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
  achievements: [],
};

const AdminEducation = () => {
  const { education, addEducation, updateEducation, deleteEducation } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Education>(emptyEducation);
  const [newAchievement, setNewAchievement] = useState("");

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ ...emptyEducation, id: Date.now().toString() });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingItem(edu);
    setFormData(edu);
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (edu: Education) => {
    setEditingItem(edu);
    setIsDeleteDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement("");
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (editingItem) {
      updateEducation(formData.id, formData);
      toast({ title: "Education updated", description: "The record has been saved." });
    } else {
      addEducation(formData);
      toast({ title: "Education added", description: "New education record has been created." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingItem) {
      deleteEducation(editingItem.id);
      toast({ title: "Education deleted", description: "The record has been removed." });
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Education</h1>
            <p className="text-muted-foreground mt-1">
              Manage your academic background
            </p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        {/* Education List */}
        <div className="grid gap-4">
          <AnimatePresence>
            {education.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No education records yet</p>
                  <Button onClick={handleOpenCreate} variant="outline" className="mt-4">
                    Add your first education
                  </Button>
                </CardContent>
              </Card>
            ) : (
              education.map((edu) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-lg">{edu.institution}</CardTitle>
                        <p className="text-muted-foreground">
                          {edu.degree} in {edu.field}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(edu)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleOpenDelete(edu)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    {edu.achievements.length > 0 && (
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((achievement, i) => (
                            <Badge key={i} variant="secondary">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Edit/Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Education" : "Add Education"}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Update the education record details"
                  : "Add a new education record to your portfolio"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  placeholder="University name"
                  value={formData.institution}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    name="degree"
                    placeholder="e.g., Bachelor of Science"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    name="field"
                    placeholder="e.g., Computer Science"
                    value={formData.field}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startYear">Start Year</Label>
                  <Input
                    id="startYear"
                    name="startYear"
                    placeholder="2021"
                    value={formData.startYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endYear">End Year</Label>
                  <Input
                    id="endYear"
                    name="endYear"
                    placeholder="2025"
                    value={formData.endYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Achievements</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {achievement}
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add achievement..."
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddAchievement())
                    }
                  />
                  <Button type="button" variant="outline" onClick={handleAddAchievement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                {editingItem ? "Save Changes" : "Add Education"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Education Record?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the education record for{" "}
                <strong>{editingItem?.institution}</strong>. This action cannot be undone.
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

export default AdminEducation;
