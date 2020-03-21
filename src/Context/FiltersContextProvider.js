import FiltersContext from './FiltersContext';
import React from 'react';

class FiltersContextProvider extends React.Component {
    state = {
        filtersInfo: {
          name: null,
          city: null,
          country: null
        },
        orderInfo: {
          order: 'down',
          orderBy: 'numberOfStudents'
        }
    };

    render() {
        return (
            <FiltersContext.Provider
                value={{

                    filtersInfo: this.state.filtersInfo,
                    setFiltersInfo: info => this.setState({filtersInfo: info}),
                    setSearchQuery: name => this.setState({filtersInfo: {...this.state.filtersInfo, name: name}}),

                    orderInfo: this.state.orderInfo,
                    setOrderInfo: info => this.setState({orderInfo: info})

                }}
            >
                {this.props.children}
            </FiltersContext.Provider>
        );
    }
}

export default FiltersContextProvider;
