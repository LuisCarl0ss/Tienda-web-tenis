import { Component } from 'react';

const styles = {
    detallesCarro: {
        backgroundColor: 'white',
        position: 'absolute',
        marginTop: '30px',
        boxShadow: '1px 5px 5px rgba(0,0,0,0.3)',
        borderRadius: '5px',
        width: '300px',
        right: '50px',
    },
    ul: {
        margin: 0,
        padding: 0,
    },
    li: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: 'solid 1px #aaa',
    },
    productInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    quantityManager: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    quantityButton: {
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '24px'
    },
    checkoutContainer: {
        padding: '15px 20px',
        borderTop: 'solid 1px #eee'
    },
    checkoutButton: {
        backgroundColor: '#000',
        color: 'white',
        width: '100%',
        padding: '12px 0',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    }
};

class DetallesCarro extends Component {
  render() {
    // Recibimos las funciones para sumar y restar
    const { carro, goToCheckout, sumarAlCarro, restarDelCarro } = this.props;

    return (
        <div style={styles.detallesCarro}>
            <ul style={styles.ul}>
                {carro.map(x => (
                    <li style={styles.li} key={x.name}>
                        <div style={styles.productInfo}>
                            <img alt={x.name} src={x.img} width="50px" height="50px" />
                            <span> {x.name} - {x.price} MXN </span>
                        </div>
                        <div style={styles.quantityManager}>
                            <button style={styles.quantityButton} onClick={() => restarDelCarro(x)}>-</button>
                            <span>{x.cantidad}</span>
                            <button style={styles.quantityButton} onClick={() => sumarAlCarro(x)}>+</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Solo se muestra el botón si hay productos en el carro */}
            {carro.length > 0 && (
                <div style={styles.checkoutContainer}>
                    <button 
                        style={styles.checkoutButton}
                        onClick={goToCheckout}
                    >
                        Ir a Pagar
                    </button>
                </div>
            )}
        </div>
    )
  }
}

export default DetallesCarro;

