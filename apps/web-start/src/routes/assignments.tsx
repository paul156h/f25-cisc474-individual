//ASSIGNMENTS PAGE
//import { Button } from "/home/paul1/f25-cisc474-individual-1/packages/ui/src/button.tsx";
import styles from "./assignments.module.css";
import AssignmentList from "../components/AssignmentList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/assignments')({
  component: AssignmentsPage,
});

function AssignmentsPage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>This is the assignments page</h1>
                    <AssignmentList />
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
