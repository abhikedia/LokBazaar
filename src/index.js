import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Dashboard from './Shopkeeper/SignedIn/Additems/addItem'
import Search from './Customer/search'
import Routes from './routes';
import Portis from './abi'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
   //<Portis/>,
  document.getElementById('root')
);
serviceWorker.unregister();
