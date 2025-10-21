import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import "../styles.css";
import { Button } from '@repo/ui/button';

interface Submission {
  id: string
  submitted_at: string
  assignment_id: string
  content: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
  owner_id: string
  assignment: Assignment
}

interface Assignment {
  id: string
  created_at: string
  title: string
  due_by: string
  instructions: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
}

export const Route = createFileRoute('/submission')({
  component: SubmissionPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined,
  }),
})

function SubmissionPage() {
  const search = useSearch({ from: '/submission' })
  const id = search.id
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`${import.meta.env.VITE_BACKEND_URL}/Submission/${id}`)
      .then((res) => res.json())
      .then((data: Submission) => {
        setSubmission(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching submission:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading submission...</p>
  if (!submission) return <p>Submission not found.</p>

  return (
    <div className="page">
      <main className="main">
        <header>
          <h1>{submission.assignment?.title}</h1>
          <p>Submitted at: {new Date(submission.submitted_at).toLocaleString()}</p>
        </header>

        <section>
          <p>{submission.content}</p>
          {submission.assignment && (
            <div>
              <h2>Assignment:</h2>
              <Button href={`/assignment?id=${submission.assignment.id}`} variant="card">
                {submission.assignment.title} — Due: {new Date(submission.assignment.due_by).toLocaleDateString()} — Type: {submission.assignment.type}
              </Button>
            </div>
        )}
        </section>
      </main>
    </div>
  )
}
