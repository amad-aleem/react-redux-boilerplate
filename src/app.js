import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import factory from './store.js';
import Routes from './Routes';
import './stylesheets/app.css';

const { store, persistor } = factory();


class App extends Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <div>
              <Routes />
            </div>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
