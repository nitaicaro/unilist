import './css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import Header from './Components/Header';
import UniTable from './Components/UniTable';
import OrderMenu from './Components/OrderMenu';
import FloatingWindow from './Components/FloatingWindow';
import FiltersMenu from './Components/FiltersMenu';
import UniInfo from './Components/UniInfo';
import AppContextProvider from './Context/AppContextProvider';
import FiltersContextProvider from './Context/FiltersContextProvider';

class SiteWrap extends React.Component {
  constructor(props) {
     super(props);
       //DB boilerplate
       Parse.serverURL = 'https://parseapi.back4app.com/';
       Parse.initialize(process.env.REACT_APP_PARSE_KEY_1, process.env.REACT_APP_PARSE_KEY_2);
      /*Here we use references and not contexts, because the components
        are only one level down */
       this.UniTable = React.createRef();
       this.CityInfoFloatingWindow = React.createRef();
       this.FiltersFloatingWindow = React.createRef();
  }

  //Adding listener for detecting scrolling to bottom
  UNSAFE_componentWillMount() {
   window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  //Removing listener for detecting scrolling to bottom
  UNSAFE_componentWillUnmount() {
   window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  //Display/Hide fliters window
  onFiltersClick() {
    const FiltersFloatingWindowCurrent = this.FiltersFloatingWindow.current;
    FiltersFloatingWindowCurrent.state.changeHiddenFunction();
  }

  //Display/Hide uni information window
  onUniClick() {
    const CityInfoFloatingWindowCurrent = this.CityInfoFloatingWindow.current;
    CityInfoFloatingWindowCurrent.state.changeHiddenFunction();
  }

  //Load more unis once users scorlls to bottom of the screen
  handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        const UniTableCurrent = this.UniTable.current;
        UniTableCurrent.loadMoreFunction();
      }
   }

  render() {
    return (
      <AppContextProvider>
      <FiltersContextProvider>
          <div style={{paddingBottom: '50px', overflow: 'scroll'}}>
            <Header />
            {this.renderOrderMenu()}
            <div style={{ ...centeredStyle, alignItems: 'center', fontSize: '11px', marginTop: '10px'}}>
              {this.renderInformationBanner()}
              <UniTable onUniClick={this.onUniClick.bind(this)} ref={this.UniTable} />
            </div>
            {this.renderFloatingWindows()}
          </div>
        </FiltersContextProvider>
        </AppContextProvider>
    );
  }

  renderOrderMenu() {
    return (
      <div style={centeredStyle}>
        <OrderMenu
        onFiltersClick={this.onFiltersClick.bind(this)}
        />
      </div>
    );
  }

  renderInformationBanner() {
    return (
      <div>
        The information on this website is provided by the users.
        If you wish to contribute or modify information, please
        do so&nbsp;
        <a href="https://docs.google.com/spreadsheets/d/1EqG9PymTJ_H_iJPKNYfvi5Z1cnEgtz7ajsNuVjvDx-g/edit#gid=0" target="_blank" rel="noopener noreferrer">
          here
        </a>.
      </div>
    );
  }

  //These windows are both rendered on site render but are hidden by default.
  renderFloatingWindows() {
    return (
      <div
      style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <FloatingWindow ref={this.FiltersFloatingWindow}>
        <FiltersMenu changeHidden={this.onFiltersClick.bind(this)}/>
      </FloatingWindow>
        <FloatingWindow ref={this.CityInfoFloatingWindow}>
          <UniInfo />
        </FloatingWindow>
      </div>
    );
  }
}

const centeredStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'
}

ReactDOM.render(
  <SiteWrap />,
  document.getElementById('root')
);
