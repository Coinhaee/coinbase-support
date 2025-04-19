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
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px', background: '#fff', marginTop: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <img src="https://cryptologos.cc/logos/coinbase-coinbase-logo.png" alt="Coinbase Logo" style={{ width: 60, height: 60 }} />
        <h1 style={{ color: '#0052FF', fontSize: '28px', marginTop: 20 }}>Coinbase Support</h1>
        <p style={{ color: '#4a4a4a' }}>How can we help you today?</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: '600' }}>Your name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} placeholder="Name" />

        <label style={{ display: 'block', marginBottom: 6, fontWeight: '600', marginTop: 20 }}>Your email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} placeholder="Email" />

        <label style={{ display: 'block', marginBottom: 6, fontWeight: '600', marginTop: 20 }}>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required style={{ ...inputStyle, height: 100 }} placeholder="How can we help?"></textarea>

        <button type="submit" style={buttonStyle}>Send</button>
      </form>
      {sent && <p style={{ color: 'green', marginTop: 20 }}>✅ Message sent successfully!</p>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '16px',
  marginBottom: '10px'
};

const buttonStyle = {
  width: '100%',
  background: '#0052FF',
  color: '#fff',
  padding: '14px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  marginTop: '30px',
  cursor: 'pointer'
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
