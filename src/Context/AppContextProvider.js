import AppContext from './AppContext';
import React from 'react';

class AppContextProvider extends React.Component {
    state = {
        currentUniInfo: {
          id: null,
          name: null,
          imgUrl: null,
          reviews: null,
          city: null,
          country: null,
          numberOfStudents: null,
          avgPriceCafeteriaLunch: null,
          nightlife: null,
          studentDiversity: null,
          welcomingToInternationalStudents: null,
          bestModeOfTransporation: null,
          proximityToATownCenter: null,
          linkToStudentFacebookGroup: null,
          exchangeOpportunities: null,
          numberOfInternationalStudents: null,
          friendlinessToInternationalStudents: null,
          weather: null,
          monthlyCostOfLiving: null,
          rentInSharedStudentApartment: null,
          totalEstimatedCostOfLivingInSharedApartment: null,
          rentStudentDorms: null,
          totalEstimatedCostOfLivingStudentDorms: null,
          rentOneBedroomApartment: null,
          easeOfGettingScholarship: null,
          qualityOfTeaching: null,
          rankingShanghai: null,
          rankingTimes: null,
          rankingQs: null,
          prestigiousBrand: null,
          reputation: null,
          graduateEmploymentRate: null,
          careerServices: null,
        }
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    currentUniInfo: this.state.currentUniInfo,
                    setUniInfo: info => this.setState({currentUniInfo: info}),
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppContextProvider;
