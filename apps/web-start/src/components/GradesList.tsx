"use client";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
  id: string;
  submitted_at: string;
  assignment_id: string;
  content: string;
  type: "QUIZ" | "UPLOAD" | "PEER";
  owner_id: string;
  assignment: Assignment;
}

interface Grade {
  id: string;
  graded_at: string;
  submission_id: string;
  score: number;
  feedback: string;
  grader_id: string;
  student_id: string;
  submission: Submission;
}

export default function GradesList() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    fetchGrades(getAccessTokenSilently)
      .then((data: Grade[]) => {
        setGrades(data);
      })
      .catch((err) => {
        console.error("Error fetching grades:", err);
        setError("Failed to load grades.");
      })
      .finally(() => setLoading(false));
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) return <p>Authenticating...</p>;

  if (!isAuthenticated)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>You must be logged in to view grades.</p>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </div>
    );

  if (loading) return <p>Loading grades...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (grades.length === 0) return <p>No grades found.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {grades.map((g) => (
        <li key={g.id}>
          {g.submission ? (
            <Button href={`/submission?id=${g.submission.id}`} variant="card">
              {g.submission.assignment.title ?? "Untitled Assignment"} — Score: {g.score}
            </Button>
          ) : (
            <span>No submission</span>
          )}
        </li>
      ))}
    </ul>
  );
}
