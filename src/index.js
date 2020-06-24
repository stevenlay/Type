import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ScoreProvider } from './contexts/ScoreContext';

ReactDOM.render(
  <ScoreProvider>
    <App />
  </ScoreProvider>,
  document.getElementById('root')
);
