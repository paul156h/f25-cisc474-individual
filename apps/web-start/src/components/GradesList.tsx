"use client";
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";

interface Grade {
    id: string;
    graded_at: string;
    submission_id: string;
    score: number;
    feedback: string;
    grader_id: string;
    student_id: string;
    submission?: {
        id: string;
        assignment?: {
            id: string;
            title: string;
        };
    };
}

export default function GradesList() {

    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/grade`)
      .then(res => res.json())
      .then((data: Grade[]) => {
        setGrades(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching grades:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading grades...</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {grades.map(g => (
        <li key={g.id}>
            <Button href={`/grade?id=${g.submission?.assignment?.id}`} variant="card">
                {g.submission?.assignment?.title}: {g.score}
            </Button>
        </li>
      ))}
    </ul>
  );
}