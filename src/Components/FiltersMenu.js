import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../css/button.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FiltersContext from '../Context/FiltersContext';
import {toTitleCase} from '../HelperFunctions.js'

class FiltersMenu extends React.Component {
  constructor(props) {
    super(props);
    /*The state holds the currently selected filter values.
    Selected filter values are submitted to context after apply
    button is clicked*/
    this.state = {
      name: null,
      country: null,
      city: null
    };
  }

  render() {
    return (
          <div style={{display: 'flex', justifyContent:'center', flexDirection: 'column'}}>
          <br/><br/>
            <Grid container direction="row" justify="center" spacing={3}>
              <Grid item>
                 {this.renderCountrySelect()}
              </Grid>
              <Grid item>
                  {this.renderCityInput()}
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {this.renderApplyButton()}
            </div>
          </div>
    );
  }

  renderCountrySelect() {
    return (
      <select
      className="buttonStyle"
      style={{height: "100%"}}
      title={this.state.country === null ? "country: " : "country: " + this.state.country}
      variant="secondary"
      id={1}
      key={"Order By"}
      onChange={e => this.setState({country: e.target.value === "Country: None" ? null : e.target.value})}
      >
        {this.renderCountriesForCountrySelect()}
      </select>
    );
  }

  renderCountriesForCountrySelect() {
    return (
      <>
        <option eventkey="None" style={{fontWeight: 'bold'}}>Country: None</option>
        <option eventkey="Canada">Canada</option>
        <option eventkey="Hong Kong">Hong Kong</option>
        <option eventkey="Israel">Israel</option>
        <option eventkey="Mexico">Mexico</option>
        <option eventkey="Mexico">Spain</option>
        <option eventkey="United Kingdom">United Kingdom</option>
        <option eventkey="USA">USA</option>
      </>
    );
  }

  renderCityInput() {
    return (
      <input
      className="buttonStyle"
      ref="CityInput"
      as="input"
      placeholder="City: None"
      style={{height: "100%"}}
      onChange={e => this.setState({city: e.target.value === "" ? null : toTitleCase(e.target.value)})}
      />
    );
  }

  renderApplyButton() {
    return (
      <button
      className="buttonStyle"
      style={{position: 'absolute', bottom: '5px', height: '10%', width: "50%"}}
      onClick=
      {
          () =>
            {
              this.context.setFiltersInfo(this.state);
              this.props.changeHidden();
            }
        }
        >
        Apply Filters
      </button>
    );
  }
}
FiltersMenu.contextType = FiltersContext;
export default FiltersMenu;
