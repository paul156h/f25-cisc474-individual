import { createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@repo/ui/button';
import { useEffect, useState } from 'react';
import { fetchAssignments } from '../api';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

export const Route = createFileRoute('/')({
  component: HomePage,
});

interface Assignment {
  id: string;
  title: string;
  due_by: string;
  type: 'QUIZ' | 'UPLOAD' | 'PEER';
}

function HomePage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [synced, setSynced] = useState(false);

  // 🧩 Ensure user exists in backend (auto-create on first login)
  useEffect(() => {
    if (!isAuthenticated || synced) return;

    const syncUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error('Failed to sync user:', await res.text());
        } else {
          setSynced(true);
          console.log('✅ User synced with backend');
        }
      } catch (err) {
        console.error('⚠️ Error syncing user:', err);
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently, synced]);

  // 📦 Fetch assignments after user syncs
  useEffect(() => {
    if (!isAuthenticated || !synced) return;

    setLoading(true);
    setError(null);

    fetchAssignments(getAccessTokenSilently)
      .then((data: Assignment[]) => {
        const nextThree = data
          .sort((a, b) => new Date(a.due_by).getTime() - new Date(b.due_by).getTime())
          .slice(0, 3);
        setAssignments(nextThree);
      })
      .catch((err) => {
        console.error('⚠️ Error fetching assignments:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, synced, getAccessTokenSilently]);

  // 🧠 Auth0 loading guard
  if (isLoading) {
    return (
      <div className="page">
        <main className="main">
          <h1>Loading authentication...</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="main">
        <h1>Paul&apos;s LMS Homepage</h1>

        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <>
            <p>Welcome, {user?.name ?? user?.email}!</p>
            <LogoutButton />

            <section style={{ marginTop: '2rem' }}>
              <h2>Next Assignments Due</h2>
              {loading && <p>Loading assignments...</p>}
              {error && <p style={{ color: 'red' }}>Error: {error}</p>}
              {!loading && assignments.length === 0 && <p>No upcoming assignments.</p>}

              <ul style={{ listStyle: 'none', padding: 0 }}>
                {assignments.map((a) => (
                  <li key={a.id}>
                    <Button href={`/assignment?id=${a.id}`} variant="card">
                      {a.title} — Due:{' '}
                      {new Date(a.due_by).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      — Type: {a.type}
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
