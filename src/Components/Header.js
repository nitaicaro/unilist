import React from 'react';
import '../fonts/icomoon/style.css';

class Header extends React.Component {

  render() {
    return (
      <div>
      {this.renderTopMessage()}
        <div style={{margin: '0.5% 5% 1% 5%', flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'}}>
          <img src={require('../imgs/logo.png')} alt="logo" />
          {this.renderSocialMediaButtons()}
        </div>
      </div>
    );
  }

  renderTopMessage(){
    return (
      <div style={{display: 'flex', backgroundColor: '#76ff61', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <div>
          Hey! My name is Nitai and this is my first side project. Follow me on Twitter at&nbsp;
          <a href="https://twitter.com/CaroNitai" target="_blank" rel="noopener noreferrer">@caronitai</a>
          &nbsp;for more future projects.
        </div>
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
