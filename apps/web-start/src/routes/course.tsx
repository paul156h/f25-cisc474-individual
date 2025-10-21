import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import "../styles.css";
import { Button } from '@repo/ui/button';

interface Course {
  id: string
  created_at: string
  name: string
  description: string
  owner_id: string
  assignments?: Assignment[]
}

interface Assignment {
  id: string
  created_at: string
  title: string
  due_by: string
  instructions: string
  type: 'QUIZ' | 'UPLOAD' | 'PEER'
}

export const Route = createFileRoute('/course')({
  component: CoursePage,
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id as string | undefined,
  }),
})

function CoursePage() {
  const search = useSearch({ from: '/course' })
  const id = search.id
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`${import.meta.env.VITE_BACKEND_URL}/Course/${id}`)
      .then((res) => res.json())
      .then((data: Course) => {
        setCourse(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching course:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading course...</p>
  if (!course) return <p>Course not found.</p>

  return (
    <div className="page">
      <main className="main">
        <header>
          <h1>{course.name}</h1>
          <p>Created: {new Date(course.created_at).toLocaleDateString()}</p>
          <p>Owner: {course.owner_id}</p>
        </header>

        <section>
            <p>{course.description}</p>

            {course.assignments && course.assignments.length > 0 && (
            <div>
               <h2>Assignments</h2>
               <ul style={{listStyle: "none", padding: 0}}>
                    {course.assignments.map((assignment) => (
                      <li key={assignment.id}>
                        <Button href={`/assignment?id=${assignment.id}`} variant='card'>{assignment.title} — Due: {new Date(assignment.due_by).toLocaleDateString()} — Type: {assignment.type}</Button>
                      </li>
                    ))}
                </ul>
              </div>
             )}

             {(!course.assignments || course.assignments.length === 0) && (
                <p>No assignments yet.</p>
            )}
        </section>
      </main>
    </div>
  )
}
