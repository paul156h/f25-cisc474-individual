import "../styles.css";
import AssignmentList from "../components/AssignmentList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/assignments')({
  component: AssignmentsPage,
});

function AssignmentsPage() {
    return (
        <div className="page">
            <main className="main">
                <h1>This is the assignments page</h1>
                <p>This is the list of assignment names rendered from the backend.</p>
                <p>Clicking on the assignments will bring you to the assignment page for each assignment</p>
                <AssignmentList />
            </main>
            <footer className="footer">
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}




/*
//ASSIGNMENTS PAGE
//import { Button } from "/home/paul1/f25-cisc474-individual-1/packages/ui/src/button.tsx";
import "../styles.css";
import AssignmentList from "../components/AssignmentList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/assignments')({
  component: AssignmentsPage,
});

function AssignmentsPage() {
    return (
        <div className="page">
            <main className="main">
                <h1>This is the assignments page</h1>
                    <p>This is the list of assignment names rendered from the backend.</p>
                    <p>Clicking on the assignments will bring you to the assignment page for each assignment</p>
                    <AssignmentList />
            </main>
            <footer className="footer">
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
*/