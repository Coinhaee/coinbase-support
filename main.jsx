import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [name, setName] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [method, setMethod] = React.useState("telegram");
  const [sent, setSent] = React.useState(false);

  const handleLogin = () => {
    if (name.trim()) setLoggedIn(true);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    await fetch("http://localhost:5000/send-support-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: "chat@client.com", message, method })
    });
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  if (!loggedIn) {
    return (
      <div style={container}>
        <h2 style={{ marginBottom: 20 }}>Log in to Support Chat</h2>
        <input
          style={inputStyle}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleLogin}>Enter Chat</button>
      </div>
    );
  }

  return (
    <div style={container}>
      <h2>Welcome, {name}</h2>
      <div style={{ marginTop: 20 }}>
        <label style={labelStyle}>Choose where to send:</label>
        <select style={inputStyle} value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="telegram">Telegram</option>
          <option value="email">Email</option>
        </select>
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          style={{ ...inputStyle, width: '100%' }}
        />
        <button style={buttonStyle} onClick={sendMessage}>Send</button>
        {sent && <p style={{ color: "lightgreen", marginTop: 10 }}>✅ Message sent!</p>}
      </div>
    </div>
  );
}

const container = {
  maxWidth: 500,
  margin: "100px auto",
  background: "#1e293b",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  textAlign: "center"
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

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontWeight: '600',
  color: '#e2e8f0'
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
