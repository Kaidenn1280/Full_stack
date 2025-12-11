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

  const API_URL = "http://localhost:3000/users";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login request
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        setSuccess("Login successful! Welcome back.");

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(data.user);
        }

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);

      } else {
        // Register request
        const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        setSuccess("Account created successfully! You can now login.");

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(data.user);
        }

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 1500);
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