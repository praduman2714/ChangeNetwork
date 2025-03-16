"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/RichTextEditor"; // ✅ Import the fixed component
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";

const CreateNote = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // ✅ Ensure state is updated
  const [loading, setLoading] = useState(false);
  const { authConfig } = useAuth();

  const links = [
    { id: 1, page: "Dashboard", link: "/notes" },
  ];

  const handleSubmit = async () => {
    if (!title || !content) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Title and Content are required!",
      });
      return;
    }

    try {
      setLoading(true);

      const requestBody = {
        subject,
        title,
        content,  // ✅ Correctly sending HTML content
      };

      console.log("Request Body:", requestBody);

      await axios.post("/api/notes/create", requestBody, authConfig);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Note created successfully!",
      });

      setTitle("");
      setContent(""); // ✅ Clear content after submission
    } catch (error: any) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to save note.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="All Notes">
      <>
        <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>

        <div className="container mx-auto p-6">
          <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Create Note for {subject}</h2>

            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* ✅ Using the corrected RichTextEditor component */}
            <RichTextEditor value={content} onChange={setContent} />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </>

    </MainLayout>
  );
};

export default CreateNote;