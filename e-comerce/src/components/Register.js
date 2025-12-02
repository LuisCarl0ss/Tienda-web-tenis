import { useState } from "react";
import { Link } from 'react-router-dom'; 

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://tienda-web-tenis.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Registro exitoso. Ahora puedes iniciar sesión.");
      } else {
        setMessage(data.message || "Error al registrar usuario");
      }
    } catch (err) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    // 1. Usamos las mismas clases que en Login.js
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>
        
        {/* Campo de Nombre de Usuario */}
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Tu nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Campo de Correo Electrónico */}
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

        {/* Campo de Contraseña */}
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

        <button type="submit" className="form-button">Registrarse</button>

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
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;