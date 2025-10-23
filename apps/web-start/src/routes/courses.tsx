import { createFileRoute } from "@tanstack/react-router";
import "../styles.css";
import CourseList from "../components/CourseList";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createCourse } from "../api";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});

export default function CoursesPage() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async () => {
    if (!isAuthenticated) return alert("Please log in first!");
    if (!name || !description || !ownerId) return alert("Fill all fields!");

    setLoading(true);
    try {
      await createCourse({ title: name, description, owner_id: ownerId }, getAccessTokenSilently);
      alert("✅ Course created successfully!");
      setName(""); setDescription(""); setOwnerId("");

      // Optionally, trigger CourseList to refresh here if needed
      // e.g., by using a global event or state library
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <h1>Courses</h1>

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
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Course Name" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course Description" />
          <input value={ownerId} onChange={(e) => setOwnerId(e.target.value)} placeholder="Owner ID" />

          <Button onClick={handleAddCourse}>{loading ? "Adding..." : "➕ Create Course"}</Button>
        </section>
      </main>
    </div>
  );
}


/*
//COURSES PAGE
//import { Button } from "@repo/ui/button";
import { createFileRoute, Link } from '@tanstack/react-router';
import "../styles.css";
import CourseList from '../components/CourseList';

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

export default function CoursesPage() {
    return (
        <div className="page">
            <main className="main">
                <h1>This is the courses page</h1>
                    <p>There will be a list of courses here</p>
                    <p>Courses:</p>
                    <CourseList />
            </main>
            <footer className="footer">
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
    */

// COURSES PAGE OLD v2
/*
import { createFileRoute } from "@tanstack/react-router";
import "../styles.css";
import CourseList from "../components/CourseList";
import { Button } from "@repo/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
});

export default function CoursesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async () => {
    if (!name || !description || !ownerId) {
      alert("Please fill out all fields before adding a course!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name,
          description,
          owner_id: ownerId,
        }),
      });

      if (res.ok) {
        alert("✅ Course created successfully!");
        setName("");
        setDescription("");
        setOwnerId("");
        window.location.reload(); // refresh to show new course in list
      } else {
        const err = await res.text();
        alert(`❌ Failed to create course: ${err}`);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("❌ Network or server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <h1>Courses</h1>
        <p>Here is a list of all courses:</p>
        <p>There are fields at the bottoms that let you add courses</p>
        <p>If you click on a course there are fields to update courses and a button to delete</p>

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
          <p style={{ color: "#666" }}>Fill in the details below to create a new course.</p>

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

            <input
              type="text"
              placeholder="Owner ID"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <Button
              onClick={handleAddCourse}
              variant="default"
            >
              {loading ? "Adding..." : "➕ Create Course"}
            </Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Paul's Website</p>
      </footer>
    </div>
  );
}



*/