import React from 'react';
import './App.css'; 
import Header from './components/Header';
import WeatherDashboard from './components/dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header className="header" />
      <WeatherDashboard />
      <Footer className="footer" />
    </div>
  );
}

export default App;
