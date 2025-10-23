import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import "../styles.css";
import { fetchAssignment } from '../api';

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

    fetchAssignment(id)
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
        </header>

        <section>
          <h2>
            {assignment.type === 'QUIZ' && 'Quiz Instructions'}
            {assignment.type === 'UPLOAD' && 'Upload Instructions'}
            {assignment.type === 'PEER' && 'Peer Review Instructions'}
          </h2>
          <p>{assignment.instructions}</p>

          {assignment.type === 'QUIZ' && (
            <div className="ctas">
              <button>Submit Quiz</button>
            </div>
          )}

          {assignment.type === 'UPLOAD' && (
            <div className="ctas">
              <input type="file" className={"file-input"} />
              <button>Upload File</button>
            </div>
          )}

          {assignment.type === 'PEER' && (
            <div className="ctas">
              <button>Submit Peer Review</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}



/*

import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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
        </header>

        <section>
          <h2>
            {assignment.type === 'QUIZ' && 'Quiz Instructions'}
            {assignment.type === 'UPLOAD' && 'Upload Instructions'}
            {assignment.type === 'PEER' && 'Peer Review Instructions'}
          </h2>
          <p>{assignment.instructions}</p>

          {assignment.type === 'QUIZ' && (
            <div className="ctas">
              <button>Submit Quiz</button>
            </div>
          )}

          {assignment.type === 'UPLOAD' && (
            <div className="ctas">
              <input type="file" className={"file-input"} />
              <button>Upload File</button>
            </div>
          )}

          {assignment.type === 'PEER' && (
            <div className="ctas">
              <button>Submit Peer Review</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

*/