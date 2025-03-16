"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";
import { useAuth } from "@/context/AuthContext";
import { 
  Container, Card, CardContent, Typography, Button, Grid, Box, CircularProgress 
} from "@mui/material";
import NoteDetails from "@/components/NoteDetails";

const AllNotes = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authConfig } = useAuth();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!subject) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/getAll/?subject=${subject}`, authConfig);
        setNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subject]);

  return (
    <MainLayout title={`Notes for ${subject || "All Subjects"}`}>
      <Container maxWidth="lg">
        <Breadcrumbs links={[{ id: 1, page: "Dashboard", link: "/notes" }]} />
        <Typography variant="h4" fontWeight="bold" mb={3}>
          All Notes for {subject}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : notes.length === 0 ? (
          <Typography>No notes found for {subject}.</Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {notes.map((note: any) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Card 
                  sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 4, 
                    transition: "0.3s",
                    "&:hover": { boxShadow: 8 } 
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{note.title}</Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) + "..." }} 
                    />
                  </CardContent>
                  
                  {/* Buttons Section */}
                  <Box display="flex" justifyContent="space-between" p={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedNote(note.id);
                        setOpenModal(true);
                      }}
                    >
                      Read More
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ✅ Modal to show note details */}
        <NoteDetails id={selectedNote} open={openModal} onClose={() => setOpenModal(false)} />
      </Container>
    </MainLayout>
  );
};

export default AllNotes;
