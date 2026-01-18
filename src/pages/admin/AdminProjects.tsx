/**
 * Admin Projects Management
 * Add, edit, and delete portfolio projects
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, FolderOpen, Save, X, ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/types";

const emptyProject: Project = {
  id: "",
  title: "",
  description: "",
  imageUrl: "",
  githubUrl: null,
  demoUrl: null,
  technologies: [],
};

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>(emptyProject);
  const [newTech, setNewTech] = useState("");

  // Open dialog for creating
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ ...emptyProject, id: Date.now().toString() });
    setIsDialogOpen(true);
  };

  // Open dialog for editing
  const handleOpenEdit = (project: Project) => {
    setEditingItem(project);
    setFormData(project);
    setIsDialogOpen(true);
  };

  // Open delete confirmation
  const handleOpenDelete = (project: Project) => {
    setEditingItem(project);
    setIsDeleteDialogOpen(true);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        value === "" && (name === "githubUrl" || name === "demoUrl") ? null : value,
    }));
  };

  // Technologies
  const handleAddTech = () => {
    if (!newTech.trim()) return;
    setFormData((prev) => ({ ...prev, technologies: [...prev.technologies, newTech.trim()] }));
    setNewTech("");
  };

  const handleRemoveTech = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(i => i !== techToRemove),
    }));
  };

  // Submit (add or update)
  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateProject(formData);
        toast({ title: "Project updated", description: "Project saved." });
      } else {
        await addProject(formData);
        toast({ title: "Project added", description: "New project created." });
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.warn("Failed to save project", err);
      toast({ title: "Error", description: "Failed to save project.", variant: "destructive" });
    }
  };

  // Delete project
  const handleDelete = async () => {
    if (!editingItem) return;
    try {
      await deleteProject(editingItem.id);
      toast({ title: "Project deleted", description: "Project removed." });
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.warn("Failed to delete project", err);
      toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
    }
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {projects.length === 0 ? (
              <Card className="md:col-span-2">
                <CardContent className="py-12 text-center">
                  <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No projects yet</p>
                  <Button onClick={handleOpenCreate} variant="outline" className="mt-4">
                    Add your first project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              projects.map((project, index) => (
                <motion.div key={project.id || `project-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(project)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleOpenDelete(project)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            GitHub
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
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
              <DialogTitle>{editingItem ? "Edit Project" : "Add Project"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the project details" : "Add a new project to your portfolio"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="My Awesome Project" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Describe what this project does..." />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Project Image URL</Label>
                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://mywebsite.com/project.png" />
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="gap-1">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTech(tech)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add technology..."
                    value={newTech} onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTech}><Plus className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* GitHub URL */}
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" name="githubUrl" value={formData.githubUrl || ""} onChange={handleChange} placeholder="https://github.com/username/repo" />
              </div>

              {/* Live Demo URL */}
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Live Demo URL</Label>
                <Input id="demoUrl" name="demoUrl" value={formData.demoUrl || ""} onChange={handleChange} placeholder="https://myproject.com" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}><Save className="h-4 w-4 mr-2" />{editingItem ? "Save Changes" : "Add Project"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{editingItem?.title}</strong>. This action cannot be undone.
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

export default AdminProjects;
