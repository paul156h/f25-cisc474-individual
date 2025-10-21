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