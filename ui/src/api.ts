const API_BASE_URL = import.meta.env.PROD 
  ? "https://textio-62w2.onrender.com" 
  : "http://localhost:8080";           

export async function sendRequest(endpoint: string, payload: unknown) {
  
  const fullUrl = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errorMessage = 'Something went wrong';
    try {
      const data = await res.json();
      errorMessage = data.error || errorMessage;
    } catch {
      errorMessage = res.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  try {
    const data = await res.json();
    return data;
  } catch {
    throw new Error('Failed to parse response as JSON');
  }
}