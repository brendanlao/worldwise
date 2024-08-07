import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("bob@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  const { handleLogin, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) handleLogin(email, password);
  }

  //need effect for isAuthenticated because if it's in handleSubmit, would not work since handleLogin is asynchronous
  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);
  return (
    <main className={styles.login}>
      <Logo />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
