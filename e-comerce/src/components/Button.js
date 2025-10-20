import { Component } from 'react';

const styles = {
    button: {
        backgroundColor: "black",
        color: "white",
        padding: "15px 20px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.3s ease",
    },

    buttonHover: {
        transform: "scale(1.1)",
        backgroundColor: "red",
    }
}

class Button extends Component {
  render() {
    return (
        <button style={styles.button} {...this.props} />
    );
}
}

export default Button;