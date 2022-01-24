import React from 'react';
import rootReducers from "./store/reducer/index";
import { createStore } from "redux";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; 
import App from './App';

const store = createStore(rootReducers);

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}> 
      <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
