import React from 'react'
import UniDisplay from './UniDisplay';
import FiltersContext from '../Context/FiltersContext';
import Spinner from 'react-bootstrap/Spinner';
import {getParseObject} from '../HelperFunctions';

class UniTable extends React.Component {

   constructor(props) {
      super(props);
      //Number of unis to be fetched from the DB each time
      this.limit = 16;
      /*When max scroll down is reached (as detected by handleScroll in index.js)
       this function needs to be called, so we put it here for index.js to access */
      this.loadMoreFunction = this.loadMore.bind(this);
      this.state = {
        //Results from DB are fetched into this array, which are later mapped to the table.
        uniArray: [],
        //For displaying spinner
        loading: null,
        /*This object is created on first DB fetch, and then saved here
          for following fetches. This is beacuse this object remembers
          which unis have already been fetched and which haven't. */
        parseUnisObj: null,
        //To be used to calculate how many unis we need to skip when loading more
        numberOfLoads: 0
      }
   }

    //Before the component renders for the first time, we load table from DB
    UNSAFE_componentWillMount() {
      this.fillUniArray(this.context);
    }

    //When filters in filterContext have changed, we reload the table
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.fillUniArray(nextContext);
    }

    setSearchParameters(unisObj, context) {
      if (context.filtersInfo.name !== null) {
        unisObj.fullText("name", context.filtersInfo.name)
      }
      if (context.filtersInfo.country !== null) {
         unisObj.equalTo("country", context.filtersInfo.country)
       }
      if (context.filtersInfo.city !== null) {
         unisObj.equalTo("city", context.filtersInfo.city)
       }
    }

    setOrderParameters(unisObj, context) {
      const order = context.orderInfo.order;
      const orderBy = context.orderInfo.orderBy;
      if (order === "down") {
        unisObj.descending(orderBy)
      } else {
        unisObj.ascending(orderBy)
      }
    }

    //Just converting to a more readable format
    dbSnapshotToUniObject (doc) {
      var uniObj = {};
      uniObj["id"] = doc.id;
      uniObj["name"] = doc.get("name");
      uniObj["city"] = doc.get("city");
      uniObj["country"] = doc.get("country");
      uniObj["imgUrl"] = doc.get("imgUrl");
      uniObj["reviews"] = doc.get("reviews");
      return uniObj;
    }

      async fillUniArray(context) {
        this.setState({loading: true, numberOfLoads: 0, uniArray: []});
        //Creating Parse object to be used as a search query at Parse Server
        let unis = getParseObject();
        //Adjusting Parse object according to selected parameters
        this.setSearchParameters(unis, context);
        this.setOrderParameters(unis, context);
        //Limiting resuts, for example fetching only first 16 universities that match query
        unis.limit(this.limit);
        let dataToAdd;
        try {
           const results = await unis.find();
           //Results have arrived, convert them to convenient format and store in state
           dataToAdd = this.resultsToArray(results);
        }
        catch (e) {
          alert("An error has occurred. Please try again later.");
        } finally {
          this.setState({loading: false, uniArray: dataToAdd, parseUnisObj: unis});
        }
      }

      /*This is called when we want to load more results from DB, for example
        when scrolled to bottom of screen */
      async loadMore() {
        this.setState({loading: true, numberOfLoads: this.state.numberOfLoads+1});
        /*We use the same Parse object that was used in previous fetches,
        this way we can skip results that have already been fetched */
        const unis = this.state.parseUnisObj;
        /*Each time we load results, we load an amount of universities setSearchParameters
        is equal to this.state.limit. The number of times that we have done it
        is saved as this.state.numberOfLoads. Therefore their product
        is the number of universities that has already been loaded and that we can skip. */
        unis.skip(this.limit*this.state.numberOfLoads);
        let dataToAdd;
        try {
          const results = await unis.find();
          //Results have arrived, convert them to convenient format and store in state
          dataToAdd = this.resultsToArray(results);
        } catch (e) {
          alert("An error has occurred. Please try again later.");
        } finally {
          this.setState(prevState => ({
            loading: false,
            uniArray: [...this.state.uniArray, ...dataToAdd],
            parseUnisObj: unis
          }));
        }
      }

      /*Converts DB results to more readable array format, where each entry is
        an object where the entries are the fetched values */
      resultsToArray(results) {
        let dataToAdd = [];
        results.forEach(doc => {
          let docObj = this.dbSnapshotToUniObject(doc);
          dataToAdd.push(docObj);
        });
        return dataToAdd;
      }

      renderUniDisplay(uni) {
        return (
            <div width="300px" height="200px" key={uni.id}>
              <UniDisplay uni={uni} onUniClick={this.props.onUniClick} />
            </div>
            )
        }

      renderTableItems() {
        return (
          <div margin-left='8px' style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(4, 1fr)',
             gridGap: '35px'}}
           >
            {this.state.uniArray.map((uni) => {return this.renderUniDisplay(uni)})}
           </div>
        );
      }

    renderErrorMessage() {
        return (
          <div
          style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontWeight: 'bold',
          fontSize: '20px'}}
          >
          <br/>
             Failed to fetch results
          </div>
        );
      }

   renderTableData() {
     if (this.state.uniArray === undefined || this.state.uniArray === null) {
       return this.renderErrorMessage();
     } else {
       return this.renderTableItems();
     }
   }

      renderSpinner() {
        if (this.state.loading) {
          return (
            <Spinner animation="border" />
          );
        }
      }

   render() {
       return (
           <div style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             flexDirection: 'column'
              }}
           >
                {this.renderTableData()}
             <br/><br/>
             {this.renderSpinner()}
           </div>
      )
   }
}

UniTable.contextType = FiltersContext;
export default UniTable
