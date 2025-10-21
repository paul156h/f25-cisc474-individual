import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import styles from "./assignment.module.css";
import "../styles.css";

interface Assignment {
  id: string
  created_at: string
  title: string
  due_by: string
  instructions: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
}

export const Route = createFileRoute('/assignment')({
  component: AssignmentPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined,
  }),
})

function AssignmentPage() {
  const search = useSearch({ from: '/assignment' })
  const id = search.id
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`${import.meta.env.VITE_BACKEND_URL}/Assignment/${id}`)
      .then((res) => res.json())
      .then((data: Assignment) => {
        setAssignment(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching assignment:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading assignment...</p>
  if (!assignment) return <p>Assignment not found.</p>

  return (
    <div className="page">
      <main className="main">
        <header>
          <h1>{assignment.title}</h1>
          <p>Created: {new Date(assignment.created_at).toLocaleDateString()}</p>
          <p>Due: {new Date(assignment.due_by).toLocaleDateString()}</p>
          <p>Type: {assignment.type}</p>
        </header>

        <section>
          <h2>
            {assignment.type === 'QUIZ' && 'Quiz Instructions'}
            {assignment.type === 'UPLOAD' && 'Upload Instructions'}
            {assignment.type === 'PEER' && 'Peer Review Instructions'}
          </h2>
          <p>{assignment.instructions}</p>

          {assignment.type === 'QUIZ' && (
            <button className="ctas">Submit Quiz</button>
          )}

          {assignment.type === 'UPLOAD' && (
            <>
              <input type="file" />
              <button className="ctas">Upload File</button>
            </>
          )}

          {assignment.type === 'PEER' && (
            <button className="ctas">Submit Peer Review</button>
          )}
        </section>
      </main>
    </div>
  )
}
