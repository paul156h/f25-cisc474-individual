//HOMEPAGE
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Paul's LMS Homepage</h1>
                <p>This will have a list of upcoming assignments in all classes</p>
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
