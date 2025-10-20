import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Componente para la pantalla de éxito
const CompraExitosa = ({ onSeguirComprando }) => (
  <div className="compra-exitosa">
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <h2>¡Gracias por tu compra!</h2>
    <p>Tu pedido ha sido procesado exitosamente.</p>
    <button className="form-button" onClick={onSeguirComprando}>Seguir Comprando</button>
  </div>
);


function PaginaCompra({ carro, setCarro }) {
  const navigate = useNavigate();
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    metodoPago: 'tarjeta',
  });
  const [compraRealizada, setCompraRealizada] = useState(false);

  // --- Lógica de Cálculo ---
  const costoEnvio = 150; // Costo de envío fijo
  const subtotal = useMemo(() => 
    carro.reduce((acc, item) => acc + item.price * item.cantidad, 0),
    [carro]
  );
  const total = subtotal + costoEnvio;

  // --- Manejadores de Eventos ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefono') {
      // Máscara para el número de teléfono: 22 24 84...
      const telefonoLimpio = value.replace(/\s/g, ''); // Quita espacios existentes
      const telefonoFormateado = telefonoLimpio.match(/.{1,2}/g)?.join(' ').substr(0, 14) || '';
      setDatosEnvio({ ...datosEnvio, [name]: telefonoFormateado });
    } else {
      setDatosEnvio({ ...datosEnvio, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend y procesar el pago.
    console.log("Compra realizada con los siguientes datos:", {
      productos: carro,
      datosEnvio,
      total,
    });
    
    setCompraRealizada(true); // Mostramos la pantalla de éxito
    setCarro([]); // Limpiamos el carrito en App.js
  };
  
  const handleSeguirComprando = () => {
    navigate('/');
  };

  // Si la compra fue exitosa, muestra la pantalla de éxito
  if (compraRealizada) {
    return <CompraExitosa onSeguirComprando={handleSeguirComprando} />;
  }
  
  // Si el carrito está vacío, no muestra el formulario de pago
  if (carro.length === 0) {
    return (
        <div className="checkout-container empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>Añade productos a tu carrito para poder comprar.</p>
            <button className="form-button" onClick={handleSeguirComprando}>Ir a la tienda</button>
        </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Finalizar Compra</h1>
      <div className="checkout-layout">
        {/* --- Columna Izquierda: Formulario --- */}
        <div className="checkout-form">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Datos de Envío</h2>
            <div className="form-group">
              <label>Nombre(s)</label>
              <input type="text" name="nombre" className="form-input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Apellidos</label>
              <input type="text" name="apellidos" className="form-input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Teléfono (10 dígitos)</label>
              <input type="tel" name="telefono" value={datosEnvio.telefono} className="form-input" onChange={handleChange} placeholder="Ej: 22 21 23 45 67" required />
            </div>
            <div className="form-group">
              <label>Dirección de Envío</label>
              <textarea name="direccion" className="form-input" rows="3" onChange={handleChange} required></textarea>
            </div>

            <h2>Método de Pago</h2>
            <div className="form-group">
              <select name="metodoPago" className="form-input" onChange={handleChange} value={datosEnvio.metodoPago}>
                <option value="tarjeta">Tarjeta de Débito/Crédito</option>
                <option value="paypal">PayPal</option>
                <option value="oxxo">Pago en OXXO</option>
              </select>
            </div>
            
            <button type="submit" className="form-button">Realizar Compra</button>
          </form>
        </div>

        {/* --- Columna Derecha: Resumen de Compra --- */}
        <div className="checkout-summary">
          <h2>Resumen de tu Compra</h2>
          <div className="summary-items">
            {carro.map(item => (
              <div key={item.name} className="summary-item">
                <img src={item.img} alt={item.name} />
                <div className="item-details">
                  <span className="item-name">{item.name} (x{item.cantidad})</span>
                  <span className="item-price">${(item.price * item.cantidad).toLocaleString('es-MX')}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <p><span>Subtotal:</span> <span>${subtotal.toLocaleString('es-MX')}</span></p>
            <p><span>Envío:</span> <span>${costoEnvio.toLocaleString('es-MX')}</span></p>
            <hr />
            <p className="total-final"><span>Total:</span> <span>${total.toLocaleString('es-MX')}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaCompra;
