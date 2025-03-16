"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";

const AllNotes = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject"); // ✅ Get subject from query
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const links = [{ id: 1, page: "Dashboard", link: "/notes" }];

  useEffect(() => {
    if (!subject) return; // ✅ Avoid fetching if subject is missing

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/getAll/?subject=${subject}`);
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
      <>
        <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>

        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">All Notes for {subject}</h2>

          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <p>No notes found for {subject}.</p>
          ) : (
            <ul className="space-y-4">
              {notes.map((note: any) => (
                <li key={note.id} className="p-4 bg-white shadow rounded-md">
                  <h3 className="text-xl font-semibold">{note.title}</h3>
                  <p className="text-gray-600">{note.content.substring(0, 100)}...</p>
                  <a href={`/notes/${note.id}`} className="text-blue-500">
                    Read More
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>

    </MainLayout>
  );
};

export default AllNotes;