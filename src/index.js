import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Impor stylesheet Toastify

ReactDOM.render(
  <Router>
    <App />
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
  </Router>,
  document.getElementById('root')
);
