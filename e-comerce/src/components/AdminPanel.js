import React, { useState } from 'react';

function AdminPanel({ tenis, setTenis }) {
  const initialState = { name: '', price: '', size: '', img: '' };
  const [form, setForm] = useState(initialState);
  const [isEditing, setIsEditing] = useState(null); // Guardará el ID del tenis que se está editando
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token'); // Necesitamos el token para las peticiones seguras

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `https://tienda-web-tenis.onrender.com/api/tenis/${isEditing}`
      : 'https://tienda-web-tenis.onrender.com/api/tenis';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        if (isEditing) {
          // Actualizar el tenis en la lista del frontend
          setTenis(tenis.map((t) => (t._id === isEditing ? data : t)));
          setMessage('Tenis actualizado correctamente');
        } else {
          // Agregar el nuevo tenis a la lista del frontend
          setTenis([...tenis, data]);
          setMessage('Tenis creado correctamente');
        }
        handleCancel(); // Limpiar el formulario
      } else {
        setMessage(data.message || 'Error en la operación');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor');
    }
  };

  const handleEdit = (tenisToEdit) => {
    setIsEditing(tenisToEdit._id);
    setForm(tenisToEdit);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este par de tenis?')) {
      try {
        const res = await fetch(`https://tienda-web-tenis.onrender.com/api/tenis/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          setTenis(tenis.filter((t) => t._id !== id));
          setMessage('Tenis eliminado correctamente');
        } else {
          const data = await res.json();
          setMessage(data.message || 'Error al eliminar');
        }
      } catch (error) {
        setMessage('Error de conexión con el servidor');
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setForm(initialState);
  };

  // Estilos en línea para simplicidad (puedes moverlos a un CSS)
  const styles = {
    panel: { 
        padding: '40px', 
        maxWidth: '1200px', 
        margin: 'auto' 
    },

    formContainer: { 
        marginBottom: '40px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px' 
    },

    table: { 
        width: '100%', 
        borderCollapse: 'collapse' 
    },

    th: { 
        background: '#f4f4f4', 
        padding: '10px', 
        border: '1px solid #ddd' 
    },

    td: { 
        padding: '10px', 
        border: '1px solid #ddd', 
        textAlign: 'center' 
    },

    img: { 
        width: '80px', 
        height: '80px', 
        objectFit: 'cover' 
    },

    actionButtons: { 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center' 
    }
  };
  
  return (
    <div style={styles.panel}>
      <h1>Panel de Administración</h1>
      
      {/* Formulario para Crear y Editar */}
      <div style={styles.formContainer} className="login-form">
        <h2>{isEditing ? 'Editar Tenis' : 'Agregar Nuevo Tenis'}</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
          <input className="form-input" name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
          <input className="form-input" name="size" placeholder="Tallas (ej. 22-27)" value={form.size} onChange={handleChange} required />
          <input className="form-input" name="img" placeholder="URL de la imagen" value={form.img} onChange={handleChange} required />
          <button className="form-button" type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
          {isEditing && <button type="button" onClick={handleCancel} style={{marginTop: '10px'}}>Cancelar Edición</button>}
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* Tabla con el Catálogo Actual */}
      <h2>Catálogo Actual</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Imagen</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Precio</th>
            <th style={styles.th}>Tallas</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tenis.map((t) => (
            <tr key={t._id}>
              <td style={styles.td}><img src={t.img} alt={t.name} style={styles.img}/></td>
              <td style={styles.td}>{t.name}</td>
              <td style={styles.td}>${t.price}</td>
              <td style={styles.td}>{t.size}</td>
              <td style={styles.td}>
                <div style={styles.actionButtons}>
                  <button onClick={() => handleEdit(t)}>Editar</button>
                  <button onClick={() => handleDelete(t._id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
