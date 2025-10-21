//FEEDBACK PAGE
//import { Button } from "@repo/ui/button";
import styles from "./feedback.module.css";
import Link from "next/link";

//

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>This is the feedback page</h1>
                    <p>Feedback on assignments will be displayed here</p>
                    <Link href="/assignment">Back</Link>
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
