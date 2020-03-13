import React from 'react';
import {Desktop, Tablet, Mobile, Default} from '../DeviceRecognizers.js'

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
        <div
        hidden={this.state.hidden}
        style={{background: 'rgba(0,0,0,0.5)', height: '100vh', width: '100vw'}}
        >
        {this.FloatingWindowAdjustedToDevice(
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
        )}
        </div>
    );
  }

  FloatingWindowAdjustedToDevice(children) {
    return (
      <>
        <Desktop> <div style={{...windowStyle, width:"50%"}}> {children} </div> </Desktop>
        <Tablet>  <div style={{...windowStyle, width:"80%"}}> {children} </div> </Tablet>
        <Mobile>  <div style={{...windowStyle, width:"90%"}}> {children} </div> </Mobile>
      </>
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

const windowStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "scroll",
    backgroundColor: "rgb(245, 245, 245)",
    transform: "translate(-50%, -50%)",
    border: "2px black solid",
    width: "50%",
    height: "75%",
    padding: "0px",
    borderRadius: "4px",
    transition: "box-shadow 1s",
    zIndex: "1001"
}


export default FloatingWindow
