//ASSIGNMENTS PAGE
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import AssignmentList from "../../components/AssignmentList";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>This is the assignments page</h1>
                    <p>There will be a full list of assignments here</p>
                    <AssignmentList />
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
