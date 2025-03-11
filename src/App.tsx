import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SIPCalculator from './components/SIPCalculator';
import MortgageCalculator from './components/MortgageCalculator';
import CarLoanCalculator from './components/CarLoanCalculator';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#005a9c',
    },
    secondary: {
      main: '#29a',
    },
    error: {
      main: '#e77',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FinanceProvider>
        <Router basename="/finance-guru-web">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sip" element={<SIPCalculator />} />
            <Route path="/mortgage" element={<MortgageCalculator />} />
            <Route path="/car-loan" element={<CarLoanCalculator />} />
          </Routes>
        </Router>
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App; 