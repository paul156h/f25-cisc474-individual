"use client";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    fetchAssignments(getAccessTokenSilently)
      .then((data: Assignment[]) => {
        setAssignments(data);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments.");
      })
      .finally(() => setLoading(false));
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) return <p>Authenticating...</p>;

  if (!isAuthenticated)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>You must be logged in to view assignments.</p>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </div>
    );

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (assignments.length === 0) return <p>No assignments found.</p>;

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
