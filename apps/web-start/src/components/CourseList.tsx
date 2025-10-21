/*
"use client";
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";

interface Course {
  id: string
  created_at: string
  name: string
  description: string
  owner_id: string
}

export default function CourseList() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/course`)
      .then(res => res.json())
      .then((data: Course[]) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {courses.map(c => (
        <li key={c.id}>
          <Button href={`/course?id=${c.id}`} variant="card">{c.name}</Button>
        </li>
      ))}
    </ul>
  );
}
  */

"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";

interface Course {
  id: string;
  created_at: string;
  name: string;
  description: string;
  owner_id: string;
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchCourses = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course`);
    const data: Course[] = await res.json();
    console.log("Fetched data:", data); // temporary debug log
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setEditName(course.name);
    setEditDesc(course.description);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/course`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        name: editName,
        description: editDesc,
      }),
    });
    setEditingId(null);
    setEditName("");
    setEditDesc("");
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/course?id=${id}`, {
      method: "DELETE",
    });
    fetchCourses();
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {courses.map((c) => (
        <li key={c.id} style={{ marginBottom: "1rem" }}>
          {editingId === c.id ? (
            <div>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <Button onClick={handleUpdate}>Save</Button>
              <Button onClick={() => setEditingId(null)}>Cancel</Button>
            </div>
          ) : (
            <div>
              <strong>{c.name}</strong>: {c.description}
              <div style={{ marginTop: "0.5rem" }}>
                <Button onClick={() => handleEdit(c)}>Edit</Button>
                <Button onClick={() => handleDelete(c.id)}>Delete</Button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
