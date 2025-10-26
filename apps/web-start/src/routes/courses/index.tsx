"use client";
import { createFileRoute } from "@tanstack/react-router";
import "../../styles.css";
import CourseList from "../../components/CourseList";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createCourse } from "../../api";

export const Route = createFileRoute("/courses/")({
  component: CoursesPage,
});

export default function CoursesPage() {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async () => {
    if (!isAuthenticated) {
      alert("Please log in first!");
      return;
    }

    if (!name || !description) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      await createCourse(
        {
          title: name,
          description,
        },
        getAccessTokenSilently
      );

      alert("✅ Course created successfully!");
      setName("");
      setDescription("");
      window.location.reload();
    } catch (err) {
      console.error("Error creating course:", err);
      alert("❌ Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <h1>Courses</h1>
        <p>This is the list of courses rendered from the backend.</p>
        <CourseList />

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
          <h2>Add a New Course</h2>

          {!isAuthenticated ? (
            <>
              <p>You must be logged in to add courses.</p>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
            </>
          ) : (
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
                placeholder="Course Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />

              <textarea
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  minHeight: "80px",
                }}
              />

              <Button onClick={handleAddCourse}>
                {loading ? "Adding..." : "➕ Create Course"}
              </Button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Paul's Website</p>
      </footer>
    </div>
  );
}
