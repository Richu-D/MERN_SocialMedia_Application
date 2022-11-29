import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import {BrowserRouter as Router} from 'react-router-dom'
// import { legacy_createStore as createStore } from "redux"
import { createStore } from "redux"
import {Provider} from "react-redux"
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "./reducers/rootReducer";
const store = createStore(rootReducer,composeWithDevTools())
ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>,
  document.getElementById('root')
);