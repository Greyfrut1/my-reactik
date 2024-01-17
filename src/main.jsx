import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './services/store';
import './App.scss';
import {LoadingProvider} from "./context/loading-context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <LoadingProvider>
                <App />
            </LoadingProvider>
        </Provider>
    </React.StrictMode>,
);