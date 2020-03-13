import React from 'react';
import AppContext from '../Context/AppContext';
import ReviewDisplay from './ReviewDisplay';
import Spinner from 'react-bootstrap/Spinner';
import {getTodaysDate, getParseObject} from '../HelperFunctions.js'

class UniInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'statistics',
      reviewText: null,
      loading: false
    }
  }

  loadReviews(reviewsArray) {
      if (reviewsArray !== undefined) {
        return reviewsArray.map(review => {
          return (
          <ReviewDisplay key={review} style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{fontSize: "12px"}}>
              {review.date}
            </div>
            <div style={{overflow: 'auto', whiteSpace:'nowrap'}}>
              {review.review}
            </div>
          </ReviewDisplay>
          )
        }
      )
    }
  }

  saveReview(context, uni) {
    const today = getTodaysDate();
    const previousReviews = context.currentUniInfo.reviews === undefined ? [] : context.currentUniInfo.reviews;
    //We concatenate the new review to the previous reviews array
    uni.set("reviews", [{review: this.state.reviewText, date: today}, ...previousReviews ]);
    uni.save().then(x => {
      alert("Your review has been submitted. Thank you!");
      this.setState({loading: false});
      }
    )
  }

  onReviewSubmit(context) {
    this.setState({loading: true});
    const reviewObj = getParseObject();
    /*The info of the university that is current being viewed is saved in the AppContext.
      So we take the review ID from there, and use that ID to submit to the right
      place in the DB*/
    reviewObj.get(context.currentUniInfo.id)
    .then(uni => this.saveReview(context, uni));
  }

  isDisabled(button) {
      return this.state.mode === button;
  }

  render () {
    return (
      <AppContext.Consumer>
      {context =>
        <div>
          <div style={{display: 'flex'}}>
            <button style={{flex: '1', height: '60px'}} disabled={this.isDisabled("statistics")} onClick={() => this.setState({mode: "statistics"})}> Statistics </button>
            <button style={{flex: '1', height: '60px'}} disabled={this.isDisabled("reviews")} onClick={() => this.setState({mode: "reviews"})}> Reviews </button>
          </div>
          <br/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1 style={headerStyle}>{context.currentUniInfo.name}</h1>
          </div>
            {this.displayByMode(context)}
        </div>
      }
      </AppContext.Consumer>
    );
  }

  renderSpinner() {
    return (
      <Spinner animation="grow" variant="secondary" />
    );
  }

  renderSubmitButton(context) {
    return (
      <button
      disabled={this.state.loading}
      style={{height: '30px', width: '30%', marginTop: "5px"}}
      onClick={() => this.onReviewSubmit(context)}
      >
        Submit
      </button>
    )
  }

  renderSpinnerOrButton(context) {
    if (this.state.loading) {
      return this.renderSpinner();
    } else {
      return this.renderSubmitButton(context);
    }
  }

  displayStatistics(context) {
    return (
      <div>
        <br/>
        <div style={{display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '35px'}}>
          {this.generateInfo(context.currentUniInfo)}
        </div>
      </div>
    );
  }

  displayReviews(context) {
    return (
      <div style={{ margin: "0 20% 0 20%", display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "column"}}>
        <textarea
        cols="50"
        rows="4"
        placeholder="Add a review..."
        style={{border: 'solid 1px'}}
        onChange={e => this.setState({reviewText: e.target.value === '' ? null : e.target.value})}
        />
          {this.renderSpinnerOrButton(context)}
          {this.loadReviews(context.currentUniInfo.reviews)}
      </div>
    );
  }

  displayByMode(context) {
    if (this.state.mode === 'statistics') {
      return this.displayStatistics(context);
    } else {
        return this.displayReviews(context);
    }
  }

  generateInfo(currentUniInfo) {
    //These values are fetched from the DB but are not displayed in the statistics tab
    const valuesToBeIgnored = ['imgUrl', 'id', 'name', 'reviews'];
    return Object.entries(currentUniInfo).map(v =>
        {
          //If a value is not to be ignored, then
          if (valuesToBeIgnored.indexOf(v[0]) < 0) {
            //Display it in the statistics tab in a "key: value" format
            return <h1 style={infoStyle} key={v[0]}>{v[0]}: {v[1]}</h1>
          } else {
            return null;
          }
        }
    );
  }
}

const headerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '24px',
  textTransform: 'capitalize'
}

const infoStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '14px',
  textTransform: 'capitalize'
}

export default UniInfo;