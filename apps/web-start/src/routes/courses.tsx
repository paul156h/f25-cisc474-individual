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
