"use client";
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";

interface Assignment {
    id: string;
    created_at: string;
    title: string;
    due_by: string;
    instructions: string;
    type: "QUIZ" | "UPLOAD" | "PEER";
}

export default function AssignmentList() {

    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/assignment`)
      .then(res => res.json())
      .then((data: Assignment[]) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {assignments.map(a => (
        <li key={a.id}>
          <Button href={`/assignment?id=${a.id}`} variant="card">
            {a.title} — Due: {new Date(a.due_by).toLocaleDateString()} — Type: {a.type}
          </Button>
        </li>
      ))}
    </ul>
  );
}