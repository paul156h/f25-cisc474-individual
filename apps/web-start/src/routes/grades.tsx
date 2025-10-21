import { createFileRoute, Link } from "@tanstack/react-router";
import "../styles.css";
import GradesList from "../components/GradesList";

export const Route = createFileRoute("/grades")({
  component: GradesPage,
});

function GradesPage() {
  return (
    <div className="page">
      <main className="main">
        <h1>GRADES</h1>
        <p>List of grades from the backend</p>
        <GradesList />
      </main>
      <footer className="footer">
        <p>Paul's Website</p>
      </footer>
    </div>
  );
}
