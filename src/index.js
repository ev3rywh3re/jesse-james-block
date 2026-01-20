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



const container = document.getElementById('jesse-james-toggle-root');

// Create a root
const root = ReactDOM.createRoot(container);

// Render the component to the root
root.render(<ToggleControl />);

export default App;