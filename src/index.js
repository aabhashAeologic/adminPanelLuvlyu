import React from 'react';
import ReactDOM from 'react-dom/client';

// this is provider it is necessary to bind our app in the redux environment
import { Provider } from 'react-redux';
import store from "./redux/store"
import App from './App';
// this is the place where we store all the data and variables so that it can be accessed form anywhere throughout the application


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // here the app is bind in the store
    <Provider store={store}>
        <App />
    </Provider>
);


