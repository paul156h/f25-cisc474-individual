"use client";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { fetchAssignments } from "../api";

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
    fetchAssignments()
      .then((data: Assignment[]) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {assignments.map((a) => (
        <li key={a.id}>
          <Button href={`/assignment?id=${a.id}`} variant="card">
            {a.title} — Due: {new Date(a.due_by).toLocaleDateString()} — Type: {a.type}
          </Button>
        </li>
      ))}
    </ul>
  );
}
