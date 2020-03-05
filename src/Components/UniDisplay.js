import React from 'react';
import '../css/button.css';
import AppContext from '../Context/AppContext';

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

  render() {
      var styleObj = this.chooseBackgroundColor();
      return (
        <AppContext.Consumer>
        {context =>
          <div className="frame"
          onMouseEnter={this.toggleHover.bind(this)}
          onMouseLeave={this.toggleHover.bind(this)}
          onClick={() => {
            this.props.onUniClick();
            context.setUniInfo(this.props.uni);
          }}
          >
            <img src={this.props.uni.imgUrl} alt='logo' width="100%" height="100%" style={styleObj}/>
            {/*<div className="bottom-left" style={{cursor: 'pointer'}}>Bottom Left</div>*/}
            {/*<div className="bottom-right" style={{cursor: 'pointer'}}>Bottom Right</div>*/}
            <div className="top-left" style={{cursor: 'pointer'}}>
              {this.props.uni.name}
              <br/>
              <div style={{fontSize: '11px'}}>
                {this.props.uni.city}, {this.props.uni.country}
              </div>
            </div>
          </div>
        }
        </AppContext.Consumer>
    );
  }
}

export default UniDisplay
