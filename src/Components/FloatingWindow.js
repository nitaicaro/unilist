import React from 'react';
import '../css/floatingWindowStyle.css'

class FloatingWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      changeHiddenFunction: this.changeHidden.bind(this),
    }
  }

  changeHidden() {
    var hidden = this.state.hidden;
    this.setState({hidden: !hidden});
  }

  render() {
    return (
      <div hidden={this.state.hidden}>
        <div
        style={{background: 'rgba(0,0,0,0.5)', height: '100vh', width: '100vw'}}
        >
          <div className="window">
            <div style={{marginLeft: '20px'}}>
              <button style={buttonStyle} onClick={this.changeHidden.bind(this)}>
                <span role="img" aria-label="Close">
                  ❌
                </span>
              </button>
              <div>
                <br/>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
    position: 'absolute',
    left: '-3px',
    top: '-3px',
    backgroundColor: 'Transparent',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    cursor:'pointer',
    overflow: 'hidden',
    outline:'none',
    fontWeight: 'bold'
}

export default FloatingWindow
