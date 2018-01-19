import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Slider from './Slider';
import store from './store';
require('./style.scss');

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Slider/>
        </div>
      </Provider>
    );
  }
}
