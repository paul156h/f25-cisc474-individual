//COURSES PAGE
//import { Button } from "@repo/ui/button";
import { createFileRoute, Link } from '@tanstack/react-router';
import styles from "./courses.module.css";

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

export default function CoursesPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>This is the courses page</h1>
                    <p>There will be a list of courses here</p>
                    <p>Courses:</p>
                    <Link to="/course">CISC 123</Link>
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
