import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import ErrorBox from "../components/errorBox.jsx";
import "../styles/auth.css"
import { validateEmail} from "../features/validators.js"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validateEmail(email)) {
    setError("Invalid email format");
    return;
    }
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <div>
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </div>
      </form>

      {error && <ErrorBox message={error} />}
      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}
