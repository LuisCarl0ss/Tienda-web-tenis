import { Component } from 'react';

const styles = {
    footer: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100px',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '0 50px',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        top: '50px',
    }
}

class Footer extends Component {
  render() {
    return (
        <nav style={styles.footer} >
            
        </nav>
    );
  }
}

export default Footer;