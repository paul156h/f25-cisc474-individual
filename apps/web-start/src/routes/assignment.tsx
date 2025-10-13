// src/routes/assignment.tsx
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

interface Assignment {
  id: string
  created_at: string
  title: string
  due_by: string
  instructions: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
}

// ✅ This defines the route `/assignment`
export const Route = createFileRoute('/assignment')({
  component: AssignmentPage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined, // expect ?id=123
  }),
})

function AssignmentPage() {
  const search = useSearch({ from: '/assignment' })
  const id = search.id
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:3000/Assignment/${id}`)
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
    <div>
      <h1>{assignment.title}</h1>
      <p><strong>ID:</strong> {assignment.id}</p>
      <p><strong>Created At:</strong> {assignment.created_at}</p>
      <p><strong>Due By:</strong> {assignment.due_by}</p>
      <p><strong>Type:</strong> {assignment.type}</p>

      {assignment.type === 'QUIZ' && (
        <div>
          <h2>Quiz Instructions</h2>
          <p>{assignment.instructions}</p>
          <button>Submit Quiz</button>
        </div>
      )}

      {assignment.type === 'UPLOAD' && (
        <div>
          <h2>Upload Instructions</h2>
          <p>{assignment.instructions}</p>
          <input type="file" />
          <button>Upload File</button>
        </div>
      )}

      {assignment.type === 'PEER' && (
        <div>
          <h2>Peer Review Instructions</h2>
          <p>{assignment.instructions}</p>
          <button>Submit Peer Review</button>
        </div>
      )}
    </div>
  )
}
