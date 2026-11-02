import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "3rem auto", padding: "1rem" }}>
      <h1>Cuckoo</h1>
      <p>Permitted vehicle photographs, collected by a local task taker.</p>
      <p>Task posting and applications are coming next.</p>
      <p>City and skills are self-declared. Payment records are simulated; no money moves.</p>
    </main>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Application root is missing");
ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
