import { useState, useEffect } from 'react'; 
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Tenis from './components/Tenis';
import Layout from './components/Layout';
import Title from './components/Title';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import PaginaCompra from './components/PaginaCompra';
import AdminPanel from './components/AdminPanel'; // Importa el panel de administración
import RutaProtegida from './components/RutaProtegida'; // Importa la ruta protegida

function App() {
  /*const [tenis] = useState([
      { name: 'Nike', price: 1500, size: "22-27", img: '/tenis/travis.jpg' },
      { name: 'Adidas', price: 1200, size: "22-27", img: '/tenis/yeezy.jpg' },
      { name: 'New Balance', price: 1000, size: "22-27", img: '/tenis/new-balance.jpg' },
      { name: 'Jordan', price: 2000, size: "22-27", img: '/tenis/travis2.jpg' },
      { name: 'Yeezy', price: 3000, size: "22-27", img: '/tenis/yeezy2.jpg' },
      { name: 'Payaso', price: 10000, size: "22-27", img: '/tenis/payaso.jpg' },
  ]);*/

  const [tenis, setTenis] = useState([]);
  useEffect(() => {
        const fetchTenis = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/tenis'); // Endpoint para obtener tenis
                const data = await res.json();
                setTenis(data); // Actualizamos el estado con los tenis de la DB
            } catch (error) {
                console.error("Error al cargar los tenis:", error);
            }
        };

        fetchTenis();
    }, []); // El array vacío asegura que solo se ejecute una vez
  const [carro, setCarro] = useState([]);
  const [esCarroVisible, setEsCarroVisible] = useState(false);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  const agregarAlCarro = (par) => {
    if (carro.find(x => x.name === par.name)) {
        const newCarro = carro.map(x => x.name === par.name
            ? ({ ...x, cantidad: x.cantidad + 1 })
            : x
        );
        return setCarro(newCarro);
    }
    setCarro(carro.concat({ ...par, cantidad: 1 }));
  };

  const restarDelCarro = (par) => {
    const productoEnCarro = carro.find(x => x.name === par.name);

    // Si la cantidad es 1, lo eliminamos del carro
    if (productoEnCarro.cantidad === 1) {
        const nuevoCarro = carro.filter(x => x.name !== par.name);
        return setCarro(nuevoCarro);
    }

    // Si la cantidad es mayor a 1, solo restamos uno
    const nuevoCarro = carro.map(x => 
        x.name === par.name
        ? { ...x, cantidad: x.cantidad - 1 }
        : x
    );
    setCarro(nuevoCarro);
  };

  const mostrarCarro = () => {
    if (!carro.length) return; // Si el carro está vacío, no hacemos nada
    setEsCarroVisible(!esCarroVisible);
  };

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);

    if (userData.role === 'admin') {
      navigate('/admin'); // Si es admin, va al panel
    } else {
      navigate('/');      // Si es usuario normal, va a la tienda
    }
  };

  const logout = () => {
    setUser(null);
    setCarro([]);
    localStorage.removeItem("token");
    navigate('/'); // Redirige a la página principal después del logout
  };

  const goToCheckout = () => {
    setEsCarroVisible(false); // Ocultamos el carrito
    if (user) {
      navigate('/checkout'); // Redirigimos a la página de checkout si el usuario está logueado
    } else {
      alert('Debes iniciar sesión para proceder al pago.');
    }
  };

  return (
    <div>
      <Navbar  
        carro={carro} 
        esCarroVisible={esCarroVisible}
        mostrarCarro={mostrarCarro}
        user={user} // Pasamos el objeto de usuario
        onLogout={logout}
        goToCheckout={goToCheckout}
        sumarAlCarro={agregarAlCarro} 
        restarDelCarro={restarDelCarro}
      />

      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Title />
              <Tenis agregarAlCarro={agregarAlCarro} tenis={tenis} />
            </>
          } />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<PaginaCompra carro={carro} setCarro={setCarro} />} />
          <Route path="/admin" element={
            <RutaProtegida user={user}>
              <AdminPanel tenis={tenis} setTenis={setTenis} />
            </RutaProtegida>
          } />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
