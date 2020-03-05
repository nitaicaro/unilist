import AppContext from './AppContext';
import React from 'react';

class AppContextProvider extends React.Component {
    state = {
        currentUniInfo: {
          id: null,
          name: null,
          city: null,
          country: null,
          imgUrl: null,
          reviews: null
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
