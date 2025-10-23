"use client";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { fetchGrades } from "../api";

interface Assignment {
    id: string;
    created_at: string;
    title: string;
    due_by: string;
    instructions: string;
    type: "QUIZ" | "UPLOAD" | "PEER";
}

interface Submission {
  id: string
  submitted_at: string
  assignment_id: string
  content: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
  owner_id: string
  assignment: Assignment
}

interface Grade {
    id: string;
    graded_at: string;
    submission_id: string;
    score: number;
    feedback: string;
    grader_id: string;
    student_id: string;
    submission: Submission
}

export default function GradesList() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGrades()
            .then(data => {
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
                    {g.submission ? (
                        <Button href={`/submission?id=${g.submission.id}`} variant="card">
                            {g.submission.assignment.title ?? "Untitled Assignment"}: {g.score}
                        </Button>
                    ) : (
                        <span>No submission</span>
                    )}
                </li>
            ))}
        </ul>
    );
}




/*
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
    submission: Submission
}

interface Submission {
  id: string
  submitted_at: string
  assignment_id: string
  content: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
  owner_id: string
  assignment: Assignment
}

interface Assignment {
    id: string;
    created_at: string;
    title: string;
    due_by: string;
    instructions: string;
    type: "QUIZ" | "UPLOAD" | "PEER";
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
          {g.submission ? (
            <Button href={`/submission?id=${g.submission.id}`} variant="card">
              {g.submission.assignment.title ?? "Untitled Assignment"}: {g.score}
            </Button>
          ) : (
            <span>No submission</span>
          )}
        </li>
      ))}
    </ul>
  );
}
*/