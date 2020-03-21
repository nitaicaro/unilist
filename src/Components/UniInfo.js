import React from 'react';
import AppContext from '../Context/AppContext';
import ReviewDisplay from './ReviewDisplay';
import Spinner from 'react-bootstrap/Spinner';
import Grid from '@material-ui/core/Grid';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
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
    try {
      const reviewObj = getParseObject();
      /*The info of the university that is current being viewed is saved in the AppContext.
        So we take the review ID from there, and use that ID to submit to the right
        place in the DB*/
      reviewObj.get(context.currentUniInfo.id)
      .then(uni => this.saveReview(context, uni));
    } catch (e) {
      alert("Submission failed. Please use the feedback button to describe what you did. Thank you!");
    }
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
            <button style={{flex: '1', height: '60px'}} disabled={this.isDisabled("statistics")} onClick={() => this.setState({mode: "statistics"})}> Scores </button>
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
      <div style={{margin: "0 10px 0 10px"}}>
        <div>
          {this.generateInfo(context.currentUniInfo)}
        </div>
      </div>
    );
  }

  displayReviews(context) {
    return (
      <div style={{margin: "0 10px 0 10px"}}>
        <Grid container direction="row" justify="space-around" spacing={2}>
          <textarea
          cols="50"
          rows="4"
          placeholder="Add a review..."
          style={{border: 'solid 1px'}}
          onChange={e => this.setState({reviewText: e.target.value === '' ? null : e.target.value})}
          />
            {this.renderSpinnerOrButton(context)}
            {this.loadReviews(context.currentUniInfo.reviews)}
        </Grid>
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

  getValueOrCompletionLink(key, value) {
    if (value === undefined) {
      return (
        <>
          <a href="https://docs.google.com/spreadsheets/d/1EqG9PymTJ_H_iJPKNYfvi5Z1cnEgtz7ajsNuVjvDx-g/edit#gid=0" target="_blank" rel="noopener noreferrer">To be completed...</a>
          &nbsp;&nbsp;
          <Tooltip placement="top" overlay={<>The information on this website is provided by the users<br/>If you know the correct value for this field and wish to provide it, please do so using the provided link.</>}>
            <img src={require('../imgs/whatisthis.jpg')} style={{height: '20px', width: '20px'}} alt="whatisthis" />
          </Tooltip>
            </>
      );
    } else if (key === "Link To Student Facebook Group") {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer">Link</a>
      );
    } else {
      return value;
    }
  }

  objectToH1(obj) {
    //These values are fetched from the DB but are not displayed in the statistics tab
    const valuesToBeIgnored = ['imgUrl', 'id', 'name', 'reviews'];
    return Object.entries(obj[1]).map(v =>
    {
      //If a value is not to be [ignored], then
      if (valuesToBeIgnored.indexOf(v[0]) < 0) {
        //Display it in the statistics tab in a "key: value" format
        let key = v[0];
        let value = this.getValueOrCompletionLink(v[0], v[1]);
        return (
          <h1 style={infoStyle} key={key}>{key}: <b>{value}</b></h1>
        );
      } else {
        return null;
      }
    });
  }

  generateInfo(currentUniInfo) {
    return Object.entries(currentUniInfo).map(v =>
      {
        return (
          <>
              <h1 style={titleStyle}>{v[0]}</h1>
              {this.objectToH1(v)}
          </>
        );
      }
    )
  }
}

const headerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '24px',
  textTransform: 'capitalize'
}

const titleStyle = {
  fontSize: '20px'
}

const infoStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '16px',
  textTransform: 'capitalize',
}

export default UniInfo;
