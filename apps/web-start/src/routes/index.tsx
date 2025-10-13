import { createFileRoute } from '@tanstack/react-router';
import styles from "./index.module.css";

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className={styles.page}>
            <main className={styles.main}>
                <h1>Paul's LMS Homepage</h1>
                <p>This will have a list of upcoming assignments in all classes</p>
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
}
