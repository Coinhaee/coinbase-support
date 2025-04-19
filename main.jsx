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
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px', background: '#111827', marginTop: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <img src="https://cryptologos.cc/logos/coinbase-coinbase-logo.png?v=026" alt="Coinbase Logo" style={{ width: 70, height: 70, filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ color: '#60a5fa', fontSize: '28px', marginTop: 20 }}>Coinbase Support</h1>
        <p style={{ color: '#cbd5e1' }}>How can we help you today?</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Your name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} placeholder="Name" />

        <label style={{ ...labelStyle, marginTop: 20 }}>Your email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="Email" />

        <label style={{ ...labelStyle, marginTop: 20 }}>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required style={{ ...inputStyle, height: 100 }} placeholder="How can we help?"></textarea>

        <button type="submit" style={buttonStyle}>Send</button>
      </form>
      {sent && <p style={{ color: '#22c55e', marginTop: 20 }}>✅ Message sent successfully!</p>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #334155',
  backgroundColor: '#1e293b',
  color: '#f1f5f9',
  fontSize: '16px',
  marginBottom: '10px'
};

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontWeight: '600',
  color: '#e2e8f0'
};

const buttonStyle = {
  width: '100%',
  background: '#3b82f6',
  color: '#fff',
  padding: '14px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  marginTop: '30px',
  cursor: 'pointer'
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
