import { Component } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from './Logo';
import Carro from './Carro';

const styles = {
  navbar: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100px',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '0 50px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  },

  buttons: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },

  button: {
    backgroundColor: "black",
    color: "white",
    padding: "15px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    textDecoration: 'none', 
    fontFamily: 'inherit', 
  },

  mensajeBienvenida: {
    color: 'white',
    marginRight: '20px',
    fontSize: '16px',
    fontWeight: '500',
  },

  logo: {
    textDecoration: 'none',
  }

}

class Navbar extends Component {
  render() {
    const { carro, esCarroVisible, mostrarCarro, user, onLogout, goToCheckout, sumarAlCarro, restarDelCarro } = this.props;

    return (
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}><Logo /></Link>
        
        <div style={styles.buttons}>
          {user ? ( // Si el usuario está logueado
            <>
              {user && <span style={styles.mensajeBienvenida}>Bienvenido, {user.username}</span>}
              <button style={styles.button} onClick={onLogout}>Logout</button>
            </>
          ) : ( // Si no está logueado
            <>
              <Link to="/login" style={styles.button}>Login</Link>
              <Link to="/register" style={styles.button}>Registro</Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" style={styles.button}>Panel Admin</Link>
          )}
          <Carro 
            carro={carro}
            esCarroVisible={esCarroVisible}
            mostrarCarro={mostrarCarro}
            goToCheckout={goToCheckout}
            sumarAlCarro={sumarAlCarro}     
            restarDelCarro={restarDelCarro}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
