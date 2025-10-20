import { Component } from 'react';
import Button from './Button';

const styles = {
    par: {
        // flex: "0 1 30%",  // ocupa ~30% del ancho
        border: "solid 1px #eee",
        borderRadius: "10px",
        boxShadow: "0 5px 5px rgb(0, 0, 0, 0.3)",
        //width: "28%",
        padding: "20px 25px",

    },

    img: {
        width: "300px",
        height: "300px",
    }
}

class Par extends Component {
  render() {
    const { tenis, agregarAlCarro } = this.props;
    console.log(this.props);
    return (
        <div style={styles.par}>
            <img style={styles.img}
                alt={tenis.name} 
                src={tenis.img} 
                // style={{ width: "200px", height: "200px", objectFit: "cover" }} 
            />
            <h3>{tenis.name}</h3>
            <p>$ {tenis.price} MXN</p>
            <p>Talla: {tenis.size}</p>
            <Button onClick={() => agregarAlCarro(tenis)}>
                Agregar al carro
            </Button>
        </div>
    );
    }
}

export default Par;