import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

// estilo
import './styles/index.sass'

// redux
import { Provider } from 'react-redux';
import { store } from './store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
