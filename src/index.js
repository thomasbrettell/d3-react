import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';
import 'regenerator-runtime/runtime.js';
import { GeistProvider, CssBaseline, Themes } from '@geist-ui/react';

const customDarkTheme = Themes.createFromDark({
  type: 'customDarkTheme',
  palette: {
    background: '#323232',
  },
});

ReactDOM.render(
  <GeistProvider themes={[customDarkTheme]} themeType='dark'>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </GeistProvider>,
  document.getElementById('root')
);
