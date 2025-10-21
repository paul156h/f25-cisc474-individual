import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../styles.css";
import { Button } from "@repo/ui/button";

interface Course {
  id: string;
  created_at: string;
  name: string;
  description: string;
  owner_id: string;
  assignments?: Assignment[];
}

interface Assignment {
  id: string;
  created_at: string;
  title: string;
  due_by: string;
  instructions: string;
  type: "QUIZ" | "UPLOAD" | "PEER";
}

export const Route = createFileRoute("/course")({
  component: CoursePage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined,
  }),
});

function CoursePage() {
  const search = useSearch({ from: "/course" });
  const id = search.id;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/course/${id}`)
      .then((res) => res.json())
      .then((data: Course) => {
        setCourse(data);
        setEditName(data.name || "");
        setEditDescription(data.description || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editName,
        description: editDescription,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setCourse(updated);
      alert("✅ Course updated successfully!");
    } else {
      alert("❌ Failed to update course.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this course?")) return;

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("🗑️ Course deleted successfully!");
      window.location.href = "/courses";
    } else {
      alert("❌ Failed to delete course.");
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="page">
      <main className="main">
        <header>
          <h1>{course.name}</h1>
          <p>Created: {new Date(course.created_at).toLocaleDateString()}</p>
          <p>Owner: {course.owner_id}</p>
        </header>

        <section>
          <p>{course.description}</p>

          {course.assignments && course.assignments.length > 0 ? (
            <div>
              <h2>Assignments</h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {course.assignments.map((assignment) => (
                  <li key={assignment.id}>
                    <Button
                      href={`/assignment?id=${assignment.id}`}
                      variant="card"
                    >
                      {assignment.title} — Due:{" "}
                      {new Date(assignment.due_by).toLocaleDateString()} — Type:{" "}
                      {assignment.type}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No assignments yet.</p>
          )}

          {/* ✏️ Edit Form */}
          <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
            <h2>Edit Course</h2>
            <form onSubmit={handleEdit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}>
              <input
                type="text"
                placeholder="New course name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
              <textarea
                placeholder="New course description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </div>

          {/* 🗑️ Delete Button */}
          <div style={{ marginTop: "1.5rem" }}>
            <Button onClick={handleDelete} variant="card" className="deleteButton">
              Delete Course
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}


//OLD PAGE

/*
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import "../styles.css";
import { Button } from '@repo/ui/button';

interface Course {
  id: string
  created_at: string
  name: string
  description: string
  owner_id: string
  assignments?: Assignment[]
}

interface Assignment {
  id: string
  created_at: string
  title: string
  due_by: string
  instructions: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
}

export const Route = createFileRoute('/course')({
  component: CoursePage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined,
  }),
})

function CoursePage() {
  const search = useSearch({ from: '/course' })
  const id = search.id
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`${import.meta.env.VITE_BACKEND_URL}/Course/${id}`)
      .then((res) => res.json())
      .then((data: Course) => {
        setCourse(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching course:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading course...</p>
  if (!course) return <p>Course not found.</p>

  return (
    <div className="page">
      <main className="main">
        <header>
          <h1>{course.name}</h1>
          <p>Created: {new Date(course.created_at).toLocaleDateString()}</p>
          <p>Owner: {course.owner_id}</p>
        </header>

        <section>
            <p>{course.description}</p>

            {course.assignments && course.assignments.length > 0 && (
            <div>
               <h2>Assignments</h2>
               <ul style={{listStyle: "none", padding: 0}}>
                    {course.assignments.map((assignment) => (
                      <li key={assignment.id}>
                        <Button href={`/assignment?id=${assignment.id}`} variant='card'>{assignment.title} — Due: {new Date(assignment.due_by).toLocaleDateString()} — Type: {assignment.type}</Button>
                      </li>
                    ))}
                </ul>
              </div>
             )}

             {(!course.assignments || course.assignments.length === 0) && (
                <p>No assignments yet.</p>
            )}
        </section>
      </main>
    </div>
  )
}
*/

