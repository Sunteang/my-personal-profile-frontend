/**
 * Admin Experience Management
 * Add, edit, and delete work experience records
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Briefcase, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { useAdmin, Experience } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const emptyExperience: Experience = {
  id: "",
  title: "",
  company: "",
  type: "fulltime",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  achievements: [],
};

const typeLabels = {
  fulltime: "Full-time",
  parttime: "Part-time",
  internship: "Internship",
  volunteer: "Volunteer",
};

const AdminExperience = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useAdmin();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Experience>(emptyExperience);
  const [newAchievement, setNewAchievement] = useState("");

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ ...emptyExperience, id: Date.now().toString() });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingItem(exp);
    setFormData(exp);
    setIsDialogOpen(true);
  };

  const handleOpenDelete = (exp: Experience) => {
    setEditingItem(exp);
    setIsDeleteDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      updateExperience(formData.id, formData);
      toast({ title: "Experience updated", description: "The record has been saved." });
    } else {
      addExperience(formData);
      toast({ title: "Experience added", description: "New experience has been created." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingItem) {
      deleteExperience(editingItem.id);
      toast({ title: "Experience deleted", description: "The record has been removed." });
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
            <h1 className="font-heading text-3xl font-bold">Experience</h1>
            <p className="text-muted-foreground mt-1">
              Manage your work experience and activities
            </p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {/* Experience List */}
        <div className="grid gap-4">
          <AnimatePresence>
            {experiences.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No experience records yet</p>
                  <Button onClick={handleOpenCreate} variant="outline" className="mt-4">
                    Add your first experience
                  </Button>
                </CardContent>
              </Card>
            ) : (
              experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{exp.title}</CardTitle>
                          <Badge variant="secondary">{typeLabels[exp.type]}</Badge>
                          {exp.current && (
                            <Badge variant="default" className="bg-green-500">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(exp)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleOpenDelete(exp)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.achievements.map((achievement, i) => (
                            <Badge key={i} variant="outline">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
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
                {editingItem ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
              <DialogDescription>
                {editingItem
                  ? "Update the experience details"
                  : "Add a new experience to your portfolio"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Software Engineer"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Experience["type"]) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    placeholder="2023-06"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    placeholder="2023-08"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={formData.current}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="current">Currently Working Here</Label>
                <Switch
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, current: checked }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your role and responsibilities..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
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
                {editingItem ? "Save Changes" : "Add Experience"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Experience?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your experience at{" "}
                <strong>{editingItem?.company}</strong>. This action cannot be undone.
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

export default AdminExperience;
