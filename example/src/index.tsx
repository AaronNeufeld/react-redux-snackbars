import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { SnackbarProvider } from '@dlefuen/react-redux-snackbars';
import App from './App';
import configureAppStore from './configureAppStore';

const store = configureAppStore()

ReactDOM.render(
  (
    <React.StrictMode>
      <Provider store={store}>
        <SnackbarProvider
          getSnackbarState={(state: any) => state}
          showDefaultDismissButton={true}>
          <App />
        </SnackbarProvider>
      </Provider>
    </React.StrictMode>
  ),
  document.getElementById('root')
)