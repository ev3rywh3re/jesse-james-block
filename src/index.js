import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const containerB = document.getElementById('random-f-image');
const rootB = ReactDOM.createRoot(containerB);

rootB.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('random-f-image')
);

export default App;