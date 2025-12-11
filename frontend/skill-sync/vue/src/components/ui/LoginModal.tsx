import { useState } from "react";
import "../../styles/LoginModal.css";

interface LoginModalProps {
  onClose: () => void;
  onSuccess?: (user: { id: number; name: string; email: string }) => void;
}

function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Demo credentials for showcase
  const DEMO_USER = {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "password123"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (isLogin) {
        // Demo Login - accept demo credentials or any input for showcase
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
          // Exact demo credentials
          const user = { id: DEMO_USER.id, name: DEMO_USER.name, email: DEMO_USER.email };
          setSuccess("Login successful! Welcome back.");
          localStorage.setItem("user", JSON.stringify(user));
          if (onSuccess) onSuccess(user);
          setTimeout(() => onClose(), 1500);
        } else if (email && password.length >= 6) {
          // Accept any valid email/password for demo purposes
          const user = { id: 2, name: email.split('@')[0], email: email };
          setSuccess("Login successful! Welcome back.");
          localStorage.setItem("user", JSON.stringify(user));
          if (onSuccess) onSuccess(user);
          setTimeout(() => onClose(), 1500);
        } else {
          throw new Error("Please enter valid email and password (min 6 characters)");
        }
      } else {
        // Demo Register - simulate successful registration
        if (name && email && password.length >= 6) {
          const user = { id: Date.now(), name: name, email: email };
          setSuccess("Account created successfully! You can now login.");
          localStorage.setItem("user", JSON.stringify(user));
          if (onSuccess) onSuccess(user);
          setTimeout(() => onClose(), 1500);
        } else {
          throw new Error("Please fill all fields (password min 6 characters)");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content login-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>×</button>

        <h2 className="login-title">
          {isLogin ? "Welcome Back" : "Join the Realm"}
        </h2>
        <p className="login-sub">
          {isLogin ? "Enter your credentials to access" : "Begin your majestic journey"}
        </p>

        {/* Error Message */}
        {error && (
          <div className="login-message error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="login-message success-message">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label className="login-label">Identity</label>
              <input
                type="text"
                className="login-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                autoComplete="off"
                disabled={loading}
              />
            </>
          )}

          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            autoComplete="off"
            disabled={loading}
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            disabled={loading}
          />

          <button
            type="submit"
            className={`btn login-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Processing...
              </span>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
        </form>

        <div className="toggle-container">
          <p>
            {isLogin ? "New here? " : "Already initiated? "}
            <span className="toggle-link" onClick={toggleMode}>
              {isLogin ? "Create Account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;