"use client";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchCourses } from "../api";

interface Course {
  id: string;
  created_at: string;
  name: string;
  description: string;
  owner_id: string;
}

export default function CourseList() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false); 
      return;
    }

    fetchCourses(getAccessTokenSilently)
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) return <p>Authenticating...</p>;

  if (!isAuthenticated)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>You must be logged in to view courses.</p>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </div>
    );

  if (loading) return <p>Loading courses...</p>;

  if (courses.length === 0)
    return <p>No courses found. Try creating one!</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {courses.map((c) => (
        <li key={c.id}>
          <Button href={`/course?id=${c.id}`} variant="card">
            {c.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
