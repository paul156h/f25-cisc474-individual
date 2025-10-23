// web-start/src/api.ts

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Helper to get auth headers
async function getAuthHeaders(
  getAccessTokenSilently?: () => Promise<string>
): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (getAccessTokenSilently) {
    try {
      const token = await getAccessTokenSilently();
      headers["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.warn("⚠️ Failed to get access token:", err);
    }
  }

  return headers;
}

// -------------------- Courses --------------------
export async function fetchCourses(getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/course`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchCourse(id: string, getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/course/${id}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createCourse(
  course: { title: string; description: string; owner_id: string },
  getAccessTokenSilently?: () => Promise<string>
) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/course`, {
    method: "POST",
    headers,
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateCourse(
  id: string,
  course: { title?: string; description?: string },
  getAccessTokenSilently?: () => Promise<string>
) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/course/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteCourse(id: string, getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/course/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

// -------------------- Assignments --------------------
export async function fetchAssignments(getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/assignment`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchAssignment(id: string, getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/assignment/${id}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// -------------------- Submissions --------------------
export async function fetchSubmissions(getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/submission`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchSubmission(id: string, getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/submission/${id}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// -------------------- Grades --------------------
export async function fetchGrades(getAccessTokenSilently?: () => Promise<string>) {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  const res = await fetch(`${BACKEND_URL}/grade`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
