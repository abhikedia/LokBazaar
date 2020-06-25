import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Dashboard from './Shopkeeper/SignedIn/Additems/addItem'
import Routes from './routes';

ReactDOM.render(
  // <React.StrictMode>
  //   <Routes />
  // </React.StrictMode>,
  <Dashboard/>,
  document.getElementById('root')
);
serviceWorker.unregister();
