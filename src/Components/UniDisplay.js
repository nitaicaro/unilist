import React from 'react';
import '../css/button.css';
import AppContext from '../Context/AppContext';
import {Desktop, Mobile, Tablet} from '../DeviceRecognizers.js'

class UniDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
}

  toggleHover() {
  	this.setState({hover: !this.state.hover});
  }

  chooseBackgroundColor() {
    if (this.state.hover === true) {
      //webkitBackfaceVisibility: 'hidden' prevents that weird flickering on Chrome.
     return {WebkitBackfaceVisibility: 'hidden', opacity: 0.5, transition: 'opacity .25s', cursor: 'pointer'}
   } else {
     return {WebkitBackfaceVisibility: 'hidden',opacity: 0.3,  transition: 'opacity .25s'}
   }
  }

  getMainBody(device) {
    var className = (device === "desktop") ? "frame" : "frameMobile";
    var styleObj = this.chooseBackgroundColor();
    return (
      <AppContext.Consumer>
      {context =>
        <div className={className}
        onMouseEnter={this.toggleHover.bind(this)}
        onMouseLeave={this.toggleHover.bind(this)}
        onClick={() => {
          this.props.onUniClick();
          context.setUniInfo(this.props.uni);
        }}
        >
          <img src={this.props.uni.General.imgUrl} alt='logo' width="100%" height="100%" style={styleObj}/>
          <div className="bottom-left" style={{cursor: 'pointer'}}>
            Students: {(this.props.uni['Number of Students'])}
          </div>
          {/*<div className="bottom-right" style={{cursor: 'pointer'}}></div>*/}
          <div className="top-left" style={{cursor: 'pointer'}}>
            {this.props.uni.General['Name']}
            <br/>
            <div style={{fontSize: '11px'}}>
              {this.props.uni.General['City']}, {this.props.uni.General['Country']}
            </div>
          </div>
        </div>
      }
      </AppContext.Consumer>
    );
  }

  renderByDevice() {
    return (
      <>
        <Mobile>{this.getMainBody('mobile')}</Mobile>
        <Desktop>{this.getMainBody('desktop')}</Desktop>
        <Tablet>{this.getMainBody('tablet')}</Tablet>
      </>
    );
  }

  render() {
      return (this.renderByDevice());
  }
}

export default UniDisplay
