import React from 'react';
import './assets/styles.css';
import { Provider } from 'react-redux';
import { MainContainer } from "./containers/MainContainer";
import { store } from "./redux/index";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <MainContainer />
      </Provider>
    </div>
  );
}

export default App;
