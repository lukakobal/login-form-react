import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email je obvezen.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Vnesi veljaven email.";
    }

    if (!password) {
      errors.password = "Geslo je obvezno.";
    } else if (password.length < 6) {
      errors.password = "Geslo mora imeti vsaj 6 znakov.";
    }

    return errors;
  };

  const errors = validate();
  const isValid = !errors.email && !errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValid) return;

    // Simulacija uspešne oddaje (kasneje tukaj pokličeš API)
    setSubmitted(true);
    // Reset polj (po želji)
    setEmail("");
    setPassword("");
    setShowPassword(false);

    // Po 2.5s skrijemo success sporočilo (le za demo)
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit} noValidate>
        <h1>Prijava</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, email: true }))}
          placeholder="tvoj@email.si"
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <label htmlFor="password">Geslo</label>
        <div className="password-row">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, password: true }))}
            placeholder="vsaj 6 znakov"
          />
          <button
            type="button"
            className="toggle"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Skrij geslo" : "Pokaži geslo"}
          >
            {showPassword ? "Skrij" : "Pokaži"}
          </button>
        </div>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <button className="submit" type="submit" disabled={!isValid}>
          Prijavi se
        </button>

        {submitted && <p className="success">Uspešno prijavljeno ✅</p>}
      </form>
    </div>
  );
}
