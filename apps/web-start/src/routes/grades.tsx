import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./grades.module.css";
import GradesList from "../components/GradesList";

export const Route = createFileRoute("/grades")({
  component: GradesPage,
});

function GradesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>This is the grades page</h1>
        <p>There will be grades here</p>
        <GradesList />
      </main>
      <footer className={styles.footer}>
        <p>Paul's Website</p>
      </footer>
    </div>
  );
}
