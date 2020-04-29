import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/components/App';
import * as serviceWorker from './serviceWorker';
// import {Provider} from 'react-redux'
// import store from "./view/store/store";


ReactDOM.render(
  //  <Provider store={store}>
        <App />
   // </Provider>
    ,
    document.getElementById('root')
    );

serviceWorker.unregister();
