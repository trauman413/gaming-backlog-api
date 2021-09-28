import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddToLibraryButton from './components/AddToLibraryButton';
import AddToLibrarySelect from './components/AddToLibrarySelect';
// import LibraryButtonDropdown from './components/LibraryButtonDropdown';

ReactDOM.render(
  <React.StrictMode>
    <AddToLibrarySelect />
    {/* <LibraryButtonDropdown /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

