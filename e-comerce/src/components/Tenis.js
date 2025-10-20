import { Component } from 'react';
import Par from './Par';

const styles = {
    tenis: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)", // 3 columnas
      gap: "30px", // espacio entre tarjetas
    }

}

class Tenis extends Component {
  render() {
    const { tenis, agregarAlCarro } = this.props;
    
    // aseguramos que tenis sea un array
    if (!Array.isArray(tenis)) {
      console.error("La prop 'tenis' no es un array:", tenis);
      return null;
    }

    return (
      <div style={styles.tenis}>
        {tenis.map(par => 
          <Par
            agregarAlCarro={agregarAlCarro}
            key={par.name}
            tenis={par}
          />
        )}
      </div>
    );
  } 
}

export default Tenis;
