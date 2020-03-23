import React from 'react';
import {Desktop, Tablet, Mobile} from '../DeviceRecognizers.js'

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
              <div style={{ marginTop: '40px' }}>
                {this.props.children}
              </div>
          )}
        </div>
    );
  }

  FloatingWindowAdjustedToDevice(children) {
    return (
      <>
        <Desktop> <div style={{...windowStyle, width:"50%"}}> {this.floatingWindowContent(children)} </div> </Desktop>
        <Tablet>  <div style={{...windowStyle, width:"80%"}}> {this.floatingWindowContent(children)} </div> </Tablet>
        <Mobile>  <div style={{...windowStyle, width:"90%"}}> {this.floatingWindowContent(children)} </div> </Mobile>
      </>
    );
  }

  floatingWindowContent(children) {
    return (
      <>
        <button style={{...buttonStyle, right: '0%', top: '0%'}} onClick={this.changeHidden.bind(this)}>
          x
        </button>
        {/*direction rtl on the outside to move scrollbar to the left.
          Then direction ltr on the inside to move text back to correct side*/}
        <div style={{overflow: 'scroll', direction: 'rtl', width: '100%', height: '100%'}}>
          <div style={{direction: 'ltr'}}>
          {children}
          </div>
        </div>
      </>
    );
  }
}

const buttonStyle = {
    position: 'absolute',
    backgroundColor: 'Transparent',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    cursor:'pointer',
    overflow: 'hidden',
    outline:'none',
    fontWeight: 'bold',
    fontSize: '30px',
    zIndex: '1'
}

const windowStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    //overflow: "scroll",
    backgroundColor: "rgb(245, 245, 245)",
    transform: "translate(-50%, -50%)",
    border: "2px black solid",
    width: "50%",
    height: "75%",
    padding: "0px",
    borderRadius: "4px",
    transition: "box-shadow 1s",
    zIndex: "0"
}


export default FloatingWindow
