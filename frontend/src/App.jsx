import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/jobs`)
      .then((r) => r.json())
      .then(setJobs)
      .catch(() => setError("API'ye ulaşılamadı"));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "2rem auto" }}>
      <h1>Cuckoo</h1>
      <p>Açık ilanlar</p>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {jobs.length === 0 && !error && <p>Henüz ilan yok.</p>}
      <ul>
        {jobs.map((j) => (
          <li key={j.id}>
            <strong>{j.title}</strong> — {j.city} — {j.price} TL
          </li>
        ))}
      </ul>
    </main>
  );
}
