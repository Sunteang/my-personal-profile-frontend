import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, MessageSquare, Mail, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import type { ContactMessage } from "@/types";

const AdminMessages = () => {
  const { messages, markMessageAsRead, deleteMessage } = useAdmin();
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    if (!message.read) {
      markMessageAsRead(message.id);
    }
  };

  const handleOpenDelete = (message: ContactMessage) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (messageToDelete) {
      await deleteMessage(messageToDelete.id);
      toast({ title: "Message deleted", description: "The message has been removed." });
    }
    setIsDeleteDialogOpen(false);
  };

  const pluralSuffix = unreadCount > 1 ? "s" : "";

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-heading text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread message${pluralSuffix}`
              : "All messages have been read"}
          </p>
        </div>

        {/* Messages List */}
        <div className="grid gap-4">
          <AnimatePresence>
            {messages.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No messages yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Messages from your contact form will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 hover:border-primary/20 ${
                      message.read ? "" : "border-primary/30 bg-primary/5"
                    }`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            message.read ? "bg-muted" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{message.name}</CardTitle>
                            {!message.read && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDelete(message);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2">{message.message}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* View Message Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Message from {selectedMessage?.name}
                {selectedMessage?.read && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    Read
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>{selectedMessage?.email}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Received on {selectedMessage && new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (selectedMessage) handleOpenDelete(selectedMessage);
                  setIsViewDialogOpen(false);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                variant="default"
                onClick={() =>
                  window.open(`mailto:${selectedMessage?.email}`, "_blank")
                }
              >
                <Mail className="h-4 w-4 mr-2" />
                Reply via Email
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Message?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the message from{" "}
                <strong>{messageToDelete?.name}</strong>. This action cannot be undone.
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

export default AdminMessages;
