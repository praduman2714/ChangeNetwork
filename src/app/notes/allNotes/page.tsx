"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardActions, Typography, Button, CircularProgress, Container } from "@mui/material";

const AllNotes = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authConfig } = useAuth();

  const links = [{ id: 1, page: "Dashboard", link: "/notes" }];

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
      <Container>
        <div className="mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          All Notes for {subject}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : notes.length === 0 ? (
          <Typography color="textSecondary">No notes found for {subject}.</Typography>
        ) : (
          notes.map((note: any) => (
            <Card key={note.id} sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{note.title}</Typography>
                {/* ✅ Render HTML properly */}
                <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{ __html: note.content.substring(0, 150) + "..." }} />
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" href={`/notes/${note.id}`}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Container>
    </MainLayout>
  );
};

export default AllNotes;
