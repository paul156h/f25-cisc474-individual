import { createFileRoute } from '@tanstack/react-router';
import "../styles.css";

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="page">
            <main className="main">
                <h1>Paul's LMS Homepage</h1>
                <p>This must be a list of the next three assignments due</p>
            </main>
            <footer className="footer">
                <p>Paul's Website</p>
            </footer>
        </div>
}
