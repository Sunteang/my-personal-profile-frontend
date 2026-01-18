/**
 * Admin Education Management
 * Add, edit, and delete education records (API-backed)
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, GraduationCap, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Education } from "@/types";

const emptyEducation: Education = {
  id: "",
  institutionName: "",
  degree: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  description: "",
};

const AdminEducation = () => {
  const { education, addEducation, updateEducation, deleteEducation } = useAdmin();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Education>(emptyEducation);

  // Open create dialog
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData(emptyEducation);
    setIsDialogOpen(true);
  };

  // Open edit dialog
  const handleOpenEdit = (edu: Education) => {
    setEditingItem(edu);
    setFormData(edu);
    setIsDialogOpen(true);
  };

  // Open delete dialog
  const handleOpenDelete = (edu: Education) => {
    setEditingItem(edu);
    setIsDeleteDialogOpen(true);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form (add or update)
  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateEducation(formData);
        toast({ title: "Education updated", description: "Record saved successfully." });
      } else {
        await addEducation(formData);
        toast({ title: "Education added", description: "New education record created." });
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.warn("Failed to save education", err);
      toast({ title: "Error", description: "Failed to save education.", variant: "destructive" });
    }
  };

 const handleDelete = async () => {
  try {
    if (editingItem?.id) {
      await deleteEducation(editingItem.id);
      toast({ title: "Education deleted", description: "Record removed successfully." });
    }
    setIsDeleteDialogOpen(false);
  } catch (err) {
    console.warn("Failed to delete education", err);
    toast({ title: "Error", description: "Failed to delete education.", variant: "destructive" });
  }
};

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Education</h1>
            <p className="text-muted-foreground mt-1">Manage your academic background</p>
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
              education.map((edu, idx) => (
                <motion.div
                  key={`${edu.institutionName}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-lg">{edu.institutionName}</CardTitle>
                        <p className="text-muted-foreground">
                          {edu.degree} in {edu.fieldOfStudy}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(edu)}>
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
                    {edu.description && (
                      <CardContent>
                        <p className="text-muted-foreground">{edu.description}</p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Education" : "Add Education"}</DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Update the education record details"
                  : "Add a new education record to your portfolio"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  name="institutionName"
                  placeholder="University name"
                  value={formData.institutionName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    name="degree"
                    placeholder="Bachelor of Science"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    name="fieldOfStudy"
                    placeholder="Computer Science"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Input
                    name="startYear"
                    placeholder="2021"
                    value={formData.startYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Input
                    name="endYear"
                    placeholder="2025"
                    value={formData.endYear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full min-h-[100px] rounded-md border p-2"
                />
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
                <strong>{editingItem?.institutionName}</strong>. This action cannot be undone.
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
