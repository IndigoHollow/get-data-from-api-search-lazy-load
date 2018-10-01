import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

// Actions
import requestApi from "../actions/requestApi";
import requestApiSuccess from "../actions/requestApiSuccess";
import requestApiError from "../actions/requestApiError";
import searchData from "../actions/searchData";
import loadMore from "../actions/loadMore";

// Fetching API url
const fetchApi = () => {
  return dispatch => {
    dispatch(requestApi());
    fetch("https://ghibliapi.herokuapp.com/films/")
      .then(res => res.json())
      .then(
        data => dispatch(requestApiSuccess(data)),
        err => dispatch(requestApiError())
      );
  };
};

// Component
class App extends Component {
  handlefindData = () => {
    console.log("d");
    //this.props.onSearchData(this.searchData.value);
    this.props.dispatch(searchData(this.searchData.value));
  };

  componentDidMount() {
    this.props.dispatch(fetchApi());
  }

  render() {
    return (
      <div>
        {/*<button onClick={() => this.props.dispatch(fetchApi())}>Show data</button>*/}
        <input
          type="text"
          ref={input => (this.searchData = input)}
          placeholder="Search..."
          onChange={this.handlefindData}
        />
        {this.props.loading ? (
          <p>Loading...</p>
        ) : this.props.error ? (
          <p>Error, try again</p>
        ) : (
          <div className="view-container">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  {this.props.data.map((item, key) => (
                    <div
                      className="col-sm-12 col-lg-12 col-md-12 book-list"
                      key={item.id}
                    >
                      <div className="thumbnail">
                        {item.title}
                        <div className="caption">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => this.props.dispatch(loadMore(this.props.load + 4))}
        >
          Load more
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
    .slice(0, state.load)
    .filter(item => item.title.includes(state.search)),
  load: state.load
  //state.reducerWork.filter(work => work.name.includes(state.filterWork))
});

const mapDispatchToProps = dispatch => ({
  onLoadData: data => {
    dispatch({
      type: "LOAD_DATA",
      payload: data
    });
  },
  onSearchData: name => {
    dispatch({
      type: "SEARCH_DATA",
      payload: name
    });
  }
});

const ConnectedApp = connect(mapStateToProps /*,
  mapDispatchToProps*/)(App);

export default ConnectedApp;
