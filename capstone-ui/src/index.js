import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App'
import reportWebVitals from './reportWebVitals';
import './Components/global.css';
import { AuthProvider } from './Components/context/AuthProvider';
import { SocketTraining } from './Components/context/SocketTraining';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
    <SocketTraining>
        <App />
    </SocketTraining>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
