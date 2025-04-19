import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/send-support-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    if (data.success) setSent(true);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial", background: "#e8f0ff", height: "100vh" }}>
      <h1 style={{ color: "#1a73e8" }}>Coinbase Support</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: 10, margin: "10px 0" }} />
        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: 10, margin: "10px 0" }} />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required style={{ width: "100%", padding: 10, margin: "10px 0" }} />
        <button type="submit" style={{ background: "#1a73e8", color: "#fff", padding: 10, border: "none", cursor: "pointer" }}>Send</button>
      </form>
      {sent && <p style={{ color: "green" }}>Message sent!</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
