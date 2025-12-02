import { useState } from "react";
import { Link } from 'react-router-dom'; 

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => { // Actualizamos el estado del formulario
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://tienda-web-tenis.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token); 
        setMessage("Login exitoso");
        onLogin(data.user, data.token); // avisamos al padre (App.js) que ya está logueado
      } else {
        setMessage(data.message || "Error en el login");
      }
    } catch (err) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="tucorreo@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="form-button">Ingresar</button>

        {message && (
          <p className={
            message.includes("Error") 
            ? "form-message error" 
            : "form-message success"
          }>
            {message}
          </p>
        )}

        <p className="auth-switch">
          ¿No tienes cuenta? <Link to="/register">Registrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
