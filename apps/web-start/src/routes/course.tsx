//COURSE SINGULAR PAGE
//import Image, { type ImageProps } from "next/image";
//import { Button } from "@repo/ui/button";
import "../styles.css";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute('/course')({
  component: CoursePage,
});

function CoursePage() {
    return (
        <div className="page">
            <main className="main">
                <h1>This is a course</h1>
                    <p>There will be information about the course here</p>
                    <Link to="/courses">Back to course list</Link>
            </main>
            <footer className="footer">
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
