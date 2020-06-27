import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import Portis from './Contract/abi'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
   //<Portis/>,
  document.getElementById('root')
);
serviceWorker.unregister();
