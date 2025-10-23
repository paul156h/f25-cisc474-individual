"use client";
import "../styles.css";
import AssignmentList from "../components/AssignmentList";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createAssignment } from "../api";

export const Route = createFileRoute("/assignments")({
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [title, setTitle] = useState("");
  const [dueBy, setDueBy] = useState("");
  const [instructions, setInstructions] = useState("");
  const [type, setType] = useState<"QUIZ" | "UPLOAD" | "PEER">("QUIZ");
  const [loading, setLoading] = useState(false);

  const handleAddAssignment = async () => {
    if (!isAuthenticated) {
      alert("Please log in first!");
      return;
    }
    if (!title || !dueBy || !instructions || !type) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      await createAssignment(
        {
          title,
          due_by: dueBy,
          instructions,
          type,
        },
        getAccessTokenSilently
      );

      alert("✅ Assignment created successfully!");
      setTitle("");
      setDueBy("");
      setInstructions("");
      setType("QUIZ");

      // Refresh the list without full reload (simpler UX)
      window.location.reload();
    } catch (err) {
      console.error("Error creating assignment:", err);
      alert("❌ Failed to create assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <h1>Assignments</h1>
        <p>This is the list of assignment names rendered from the backend.</p>
        <p>Clicking an assignment will bring you to its detailed page.</p>

        <AssignmentList />

        <section
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            background: "white",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <h2>Add a New Assignment</h2>

          {!isAuthenticated ? (
            <>
              <p>You must be logged in to add assignments.</p>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="text"
                  placeholder="Assignment Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  type="date"
                  placeholder="Due Date"
                  value={dueBy}
                  onChange={(e) => setDueBy(e.target.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />

                <textarea
                  placeholder="Instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    minHeight: "80px",
                  }}
                />

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "QUIZ" | "UPLOAD" | "PEER")}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="QUIZ">Quiz</option>
                  <option value="UPLOAD">Upload</option>
                  <option value="PEER">Peer</option>
                </select>

                <Button onClick={handleAddAssignment}>
                  {loading ? "Adding..." : "➕ Create Assignment"}
                </Button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Paul's Website</p>
      </footer>
    </div>
  );
}

export default AssignmentsPage;
