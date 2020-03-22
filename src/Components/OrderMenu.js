import React from 'react';
import '../css/button.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FiltersContext from '../Context/FiltersContext';
import {Desktop, Tablet, Mobile} from '../DeviceRecognizers.js'


class OrderMenu extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
       query: null
     }
  }

  onOrderByDropDownSelect(context, e) {
    context.setOrderInfo({...context.orderInfo, orderBy: e.target.value});
  }

  onSearch(query, context) {
    context.setSearchQuery(query);
  }

  onOrderClick(context) {
    var nextOrder = context.orderInfo.order === 'up' ? 'down' : 'up';
    context.setOrderInfo({...context.orderInfo, order: nextOrder});
  }

  chooseOrderIcon(context) {
    if (context.orderInfo.order === 'down') {
      return '↓';
    }
    return '↑';
  }

  render() {
    return (
      <FiltersContext.Consumer>
      { context =>
        <>
          {this.renderDesktop(context)}
          {this.renderMobile(context)}
          {this.renderTablet(context)}
        </>
      }
      </FiltersContext.Consumer>
    );
  }

  renderDesktop(context) {
    return (
      <Desktop>
      <div style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '5%', marginRight: '5%'}}>
        <div style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
          {this.renderFiltersButton()}
          &nbsp;&nbsp;
          {this.renderOrderByDropDown(context)}
          {this.renderOrderButton(context)}
        </div>
        <div style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          {this.renderSearchInput(context)}
        </div>
      </div>
      </Desktop>
    );
  }

  renderMobile(context) {
    return (
      <Mobile>
        {this.renderMobileOrTablet(context)}
      </Mobile>
    );
  }

  renderTablet(context) {
    return (
      <Tablet>
        {this.renderMobileOrTablet(context)}
      </Tablet>
    );
  }

  renderMobileOrTablet(context) {
    return (
      <>
        <br/>
        {this.renderSearchInput(context)}
        <br/>
        <div style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end'}}>
            {this.renderFiltersButton()}
            {this.renderOrderByDropDown(context)}
            {this.renderOrderButton(context)}
        </div>
      </>
    );
  }

  renderFiltersButton() {
    return (
      <button className="buttonStyle" style={{width: "110px"}} onClick={this.props.onFiltersClick}>
        Filters
      </button>
    );
  }

  renderOrderByDropDown(context) {
    return (
      <select
      style={{ width: "200px", fontSize: '16px'}}
      className="buttonStyle"
      title={'Order By: ' + this.state.dropDownTitle}
      id={1}
      key={"Order By"}
      onChange={this.onOrderByDropDownSelect.bind(this, context)}
      >
        {this.renderOrderByOptions()}
      </select>
    );
  }

  renderOrderByOptions() {
    return (
      <>
      <option value="numberOfStudents">Number Of Students</option>
      <option value="name">Name</option>
      <option value="city">City</option>
      <option value="country">Country</option>
      </>
    );
  }

  renderOrderButton(context) {
    return (
      <button
      style={{ width: "40px"}}
      className="buttonStyle"
      onClick={() => this.onOrderClick(context)}>
        {this.chooseOrderIcon(context)}
      </button>
    );
  }

  renderSearchInput(context) {
    return (
      <form action="#" className="search-form d-inline-block">
        <div className="d-flex">
          <input
          className="form-control"
          placeholder="Search..."
          onChange={e => this.setState({query: e.target.value === '' ? null : e.target.value})} />
          <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => this.onSearch(this.state.query, context)}>
            <span className="icon-search"/>
          </button>
        </div>
      </form>
    );
  }
}

export default OrderMenu
