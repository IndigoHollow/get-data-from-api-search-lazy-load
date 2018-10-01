import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ConnectedApp from "./components/App";

// Reducer
import reducer from "./reducers/reducer";

// Store
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
