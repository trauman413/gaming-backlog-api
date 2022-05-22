import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddToLibrarySelect from './components/AddToLibrarySelect';

ReactDOM.render(
  <React.StrictMode>
    <AddToLibrarySelect />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  );