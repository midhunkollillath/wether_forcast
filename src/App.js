import './App.css';
import { Container, Typography } from '@mui/material';
import Header from './components/Header';
import WeatherDashboard from './components/WeatherDashBoard';
import Footer from './components/Footer';

function App() {
  return (
    <Container maxWidth="xl">
    <Header />
  
    <WeatherDashboard />
    <Footer />
  </Container>
  );
}

export default App;
