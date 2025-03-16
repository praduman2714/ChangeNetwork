"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography, IconButton, Button, Box 
} from "@mui/material";
import { X } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const NoteDetails = ({ id, open, onClose }: { id: string | null, open: boolean, onClose: () => void }) => {
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { authConfig } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/getSingle/?id=${id}`, authConfig);
        setNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Handle Delete with Confirmation
  const handleDelete = async () => {
    if (!note?.id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/notes/delete/${note.id}`, authConfig);
      alert("Note deleted successfully.");
      onClose(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {note?.title || "Note Details"}
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16 }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : note ? (
          <>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: note.content }} />
          </>
        ) : (
          <Typography color="error">Note not found.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Created At: {formatDate(note?.createdAt)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Updated At: {formatDate(note?.updatedAt)}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" size="small">
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="small" 
            sx={{ ml: 2 }} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDetails;
