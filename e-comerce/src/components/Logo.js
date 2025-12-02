import { Component } from 'react';

const styles = {
    logo: {
        fontWeight: '700',
        fontSize: '2rem',
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer',
    }
}

class Logo extends Component {
  render() {
    return (
        <a style={styles.logo} href='/'>
            Shop
        </a>
    );
    }
}

export default Logo;
