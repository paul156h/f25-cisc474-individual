// src/routes/assignment.tsx
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import styles from "./assignment.module.css";

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
    <div className={`${styles.page} max-w-3xl mx-auto p-6 rounded-2xl shadow-md bg-white`}>
  <header className="mb-6 border-b pb-4">
    <h1 className="text-3xl font-bold text-gray-800 mb-2">{assignment.title}</h1>
    <p className="text-sm text-gray-500">
      <strong>ID:</strong> {assignment.id}
    </p>
    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
      <p><strong>Created:</strong> {new Date(assignment.created_at).toLocaleDateString()}</p>
      <p><strong>Due:</strong> {new Date(assignment.due_by).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {assignment.type}</p>
    </div>
  </header>

  <main>
    {assignment.type === 'QUIZ' && (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">Quiz Instructions</h2>
        <p className="text-gray-700 leading-relaxed">{assignment.instructions}</p>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Submit Quiz
        </button>
      </section>
    )}

    {assignment.type === 'UPLOAD' && (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700">Upload Instructions</h2>
        <p className="text-gray-700 leading-relaxed">{assignment.instructions}</p>
        <div className="flex flex-col gap-3">
          <input
            type="file"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Upload File
          </button>
        </div>
      </section>
    )}

    {assignment.type === 'PEER' && (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-purple-700">Peer Review Instructions</h2>
        <p className="text-gray-700 leading-relaxed">{assignment.instructions}</p>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
          Submit Peer Review
        </button>
      </section>
    )}
  </main>
</div>

  )
}
