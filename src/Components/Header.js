import React from 'react';
import '../fonts/icomoon/style.css';

class Header extends React.Component {

  render() {
    return (
        <div style={{margin: '0.5% 5% 1% 5%', flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
          <img src={require('../imgs/logo.png')} alt="logo" />
          {this.renderSocialMediaButtons()}
        </div>
    );
  }

  renderSocialMediaButtons() {
    return (
      <div className="ml-md-auto top-social d-none d-lg-inline-block">
        <a href="./index" target="_blank" rel="noopener noreferrer" className="d-inline-block p-3"><span className="icon-facebook"></span></a>
        <a href="https://twitter.com/CaroNitai" target="_blank" rel="noopener noreferrer" className="d-inline-block p-3"><span className="icon-twitter"></span></a>
        <a href="./index" target="_blank" rel="noopener noreferrer" className="d-inline-block p-3"><span className="icon-instagram"></span></a>
      </div>
    );
  }
}

export default Header;
