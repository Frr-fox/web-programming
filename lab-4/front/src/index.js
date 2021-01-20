import React from 'react';
import {render} from 'react-dom';
import {store} from "./store/store";
import {Provider} from "react-redux";
import App from './containers/App';
console.log("Something is going on");
render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
