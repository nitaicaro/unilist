import AppContext from './AppContext';
import React from 'react';

class AppContextProvider extends React.Component {
    state = {
        currentUniInfo: {
          "General": {
            id: null,
            name: null,
            imgUrl: null,
            reviews: null,
            city: null,
            country: null,
            linkToStudentFacebookGroup: null,
            numberOfStudents: null,
          }, "Student Life": {
            nightlife: null,
            studentDiversity: null,
          }, "University Town": {
            bestModeOfTransporation: null,
            proximityToATownCenter: null,
            weather: null,
          }, "International Life": {
            exchangeOpportunities: null,
            welcomingToInternationalStudents: null,
            numberOfInternationalStudents: null,
            friendlinessToInternationalStudents: null,
          }, "Cost of Living": {
            avgPriceCafeteriaLunch: null,
            monthlyCostOfLiving: null,
            rentInSharedStudentApartment: null,
            totalEstimatedCostOfLivingInSharedApartment: null,
            rentStudentDorms: null,
            totalEstimatedCostOfLivingStudentDorms: null,
            rentOneBedroomApartment: null,
            easeOfGettingScholarship: null,
          }, "Academics": {
            qualityOfTeaching: null,
            rankingShanghai: null,
            rankingTimes: null,
            rankingQs: null,
            prestigiousBrand: null,
            reputation: null,
          }, "Career": {
            graduateEmploymentRate: null,
            careerServices: null,
          }
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
