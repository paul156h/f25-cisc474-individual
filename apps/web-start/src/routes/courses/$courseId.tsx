import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../../styles.css";
import { Button } from "@repo/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchCourse, updateCourse, deleteCourse } from "../../api";

export const Route = createFileRoute("/courses/$courseId")({
  component: CoursePage,
});

export default function CoursePage() {
  console.log("🧭 CoursePage mounted");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { courseId } = Route.useParams(); // ✅ get param from URL like /courses/123
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

useEffect(() => {
  console.log("Debug ⇒ entering useEffect", { courseId, isAuthenticated });

  if (!courseId || !isAuthenticated) return;

  console.log("🔍 Fetching course:", courseId);
  fetchCourse(courseId, getAccessTokenSilently)
    .then((data) => {
      console.log("📦 Course data received:", data);
      setCourse(data);
      setEditName(data.name || data.title || "");
      setEditDescription(data.description || "");
    })
    .catch(async (err) => {
      console.error("❌ Error fetching course:", err);
      if (err instanceof Response) {
        const text = await err.text();
        console.error("📜 Response error text:", text);
      }
    })
    .finally(() => {
      console.log("✅ Finished course fetch cycle");
      setLoading(false);
    });
}, [courseId, isAuthenticated]);



  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    try {
      const updated = await updateCourse(
        courseId,
        { title: editName, description: editDescription },
        getAccessTokenSilently
      );
      setCourse(updated);
      alert("✅ Course updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update course.");
    }
  };

  const handleDelete = async () => {
  if (!courseId) return;
  if (!confirm("Are you sure?")) return;

  try {
    console.log("🧩 Deleting course:", courseId);
    const token = await getAccessTokenSilently();
    console.log("🔑 Got access token:", token ? "yes" : "no");

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/course/${courseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("📡 Delete response:", res.status, res.statusText);
    const text = await res.text();
    console.log("📜 Response body:", text);

    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    alert("🗑️ Course deleted successfully!");
    window.location.href = "/courses";
  } catch (err) {
    console.error("❌ Delete failed:", err);
    alert("❌ Failed to delete course.");
  }
};


  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="page">
      <main className="main">
        <header>
          <h1>{course.name || course.title}</h1>
          <p>Created: {new Date(course.created_at).toLocaleDateString()}</p>
          {course.owner_id && <p>Owner: {course.owner_id}</p>}
        </header>

        <section>
          <p>{course.description}</p>

          {course.assignments && course.assignments.length > 0 ? (
            <>
              <h2>Assignments</h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {course.assignments.map((a: any) => (
                  <li key={a.id}>
                    <Button href={`/assignment?id=${a.id}`} variant="card">
                      {a.title} — Due:{" "}
                      {new Date(a.due_by).toLocaleDateString()} — Type: {a.type}
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No assignments yet.</p>
          )}

          {isAuthenticated && (
            <>
              <div
                style={{
                  marginTop: "2rem",
                  borderTop: "1px solid #ccc",
                  paddingTop: "1rem",
                }}
              >
                <h2>Edit Course</h2>
                <form
                  onSubmit={handleEdit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    maxWidth: "400px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="New course name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="New course description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  />
                  <Button type="submit">Save Changes</Button>
                </form>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <Button onClick={handleDelete} variant="card">
                  Delete Course
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
