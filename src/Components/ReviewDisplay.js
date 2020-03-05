import React from 'react';

class ReviewDisplay extends React.Component {

  render() {
    return (
      <div
      style={{display: "flex", justifyContent: "flex-start", flexDirection: "column",
              width: "150%", height: "80px", border: 'solid 0.5px',
              margin: "5px 0px 0px 0px",}}>
        <div style={{marginLeft: "3px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ReviewDisplay;
