import { Component } from 'react';
import BubbleAlert from './BubbleAlert';
import DetallesCarro from './DetallesCarro';

const styles = {
    carro: {
        backgroundColor: 'gray',
        color: 'white',
        border: 'none',
        padding: '15px',
        borderRadius: '15px',
        cursor: 'pointer',
    },

    bubble: {
        position: 'relative',
        left: '12px',
        top: '20px',
    },

    img: {
        width: '30px',
        height: '30px',
    }
}
 
class Carro extends Component {
  render() {
    const { carro, esCarroVisible, mostrarCarro, goToCheckout, sumarAlCarro, restarDelCarro } = this.props;
    const cantidad = carro.reduce((acc, el) => acc + el.cantidad, 0);
    return (
        <div>
            <span style={styles.bubble}>
                {cantidad !== 0
                 ? <BubbleAlert value={cantidad} />
                 : null}
            </span>
            <button onClick={mostrarCarro}  style={styles.carro}>
                <img style={styles.img}  src='/iconos/carrito-de-compras.png'/>
            </button>
            {esCarroVisible ? 
                <DetallesCarro 
                    carro={carro} 
                    goToCheckout={goToCheckout} 
                    sumarAlCarro={sumarAlCarro} 
                    restarDelCarro={restarDelCarro} 
                /> : null}
        </div>
    );
    }
}

export default Carro;