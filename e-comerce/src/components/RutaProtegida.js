import { Navigate } from 'react-router-dom';

function RutaProtegida({ user, children }) {
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;

