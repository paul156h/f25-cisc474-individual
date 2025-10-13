"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Assignment {
  id: string;
  created_at: string;
  title: string;
  due_by: string;
  instructions: string;
  type: "QUIZ" | "UPLOAD" | "PEER";
}

function AssignmentContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/Assignment/${id}`)
      .then((res) => res.json())
      .then((data: Assignment) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assignment:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading assignment...</p>;
  if (!assignment) return <p>Assignment not found.</p>;

  return (
    <div>
      <h1>{assignment.title}</h1>
      <p><strong>ID:</strong> {assignment.id}</p>
      <p><strong>Created At:</strong> {assignment.created_at}</p>
      <p><strong>Due By:</strong> {assignment.due_by}</p>
      <p><strong>Type:</strong> {assignment.type}</p>

      {assignment.type === "QUIZ" && (
        <div>
          <h2>Quiz Instructions</h2>
          <p>{assignment.instructions}</p>
          <p>[Quiz questions would be displayed here]</p>
          <button>Submit Quiz</button>
        </div>
      )}

      {assignment.type === "UPLOAD" && (
        <div>
          <h2>Upload Instructions</h2>
          <p>{assignment.instructions}</p>
          <input type="file" />
          <button>Upload File</button>
        </div>
      )}

      {assignment.type === "PEER" && (
        <div>
          <h2>Peer Review Instructions</h2>
          <p>{assignment.instructions}</p>
          <p>[Peer review submission form would be here]</p>
          <button>Submit Peer Review</button>
        </div>
      )}
    </div>
  );
}

export default function AssignmentOne() {
  return (
    <Suspense fallback={<p>Loading assignment...</p>}>
      <AssignmentContent />
    </Suspense>
  );
}

