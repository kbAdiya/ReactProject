import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import ErrorBox from "../components/errorBox.jsx";
import "../styles/auth.css"
import { validateEmail, validatePassword } from "../features/validators.js"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
    setError("Invalid email format");
    return;
    }

    if (!validatePassword(password)) {
    setError("Password must be at least 8 chars, include 1 number and 1 special character");
    return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-container" >
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="8 chars, include 1 number and 1 special character"/>
        <label>Confirm password</label>
        <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" required />
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
        </div>
      </form>

      {error && <ErrorBox message={error} />}
      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
