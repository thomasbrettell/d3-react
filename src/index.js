import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';
import "regenerator-runtime/runtime.js";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
