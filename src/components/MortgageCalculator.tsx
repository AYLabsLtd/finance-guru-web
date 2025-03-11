import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Slider,
  Paper,
  Alert,
} from '@mui/material';
import { useFinance } from '../context/FinanceContext';
import MoneyAllocation from './MoneyAllocation';

interface MortgageResult {
  downPayment?: number;
  loanAmount?: number;
  monthlyPayment?: number;
  totalPayment?: number;
  totalInterest?: number;
  effectiveRate?: number;
}

export default function MortgageCalculator() {
  const { moneyAtHand, downPaymentOptional } = useFinance();

  // Housing section state
  const [houseCost, setHouseCost] = useState<number>(0);
  const [housePct, setHousePct] = useState<number>(20);
  const [annualInterest, setAnnualInterest] = useState<number>(7.5);
  const [amortYears, setAmortYears] = useState<number>(20);
  const [mortgageResult, setMortgageResult] = useState<MortgageResult>({});

  // Effect to update down payment percentage when optional down payment changes
  useEffect(() => {
    if (downPaymentOptional > 0 && houseCost > 0) {
      const pct = (downPaymentOptional / houseCost) * 100;
      setHousePct(pct);
    }
  }, [downPaymentOptional, houseCost]);

  const calculateMortgage = () => {
    const downPayment = downPaymentOptional || (houseCost * (housePct / 100));
    const loanAmount = houseCost - downPayment;
    const monthlyRate = (annualInterest / 100) / 12;
    const numPayments = amortYears * 12;

    const monthlyPayment = loanAmount * (
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;
    const effectiveRate = ((totalPayment / loanAmount) - 1) * 100;

    setMortgageResult({
      downPayment,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveRate,
    });
  };

  const resetMortgage = () => {
    setHouseCost(0);
    setHousePct(20);
    setAnnualInterest(7.5);
    setAmortYears(20);
    setMortgageResult({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Home Mortgage Calculator
      </Typography>

      {/* Top Section - Money Allocation */}
      <MoneyAllocation />

      {/* Housing Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Housing</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="House Cost"
              type="number"
              value={houseCost || ''}
              onChange={(e) => setHouseCost(Number(e.target.value))}
              placeholder="e.g. 5000000"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Down Payment %</Typography>
            <Slider
              value={housePct}
              onChange={(_, value) => setHousePct(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
              disabled={downPaymentOptional > 0}
            />
            <TextField
              fullWidth
              type="number"
              value={housePct}
              onChange={(e) => setHousePct(Number(e.target.value))}
              disabled={downPaymentOptional > 0}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Interest Rate (Annual %)</Typography>
            <Slider
              value={annualInterest}
              onChange={(_, value) => setAnnualInterest(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={annualInterest}
              onChange={(e) => setAnnualInterest(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Amortization Period (Years)</Typography>
            <Slider
              value={amortYears}
              onChange={(_, value) => setAmortYears(value as number)}
              min={1}
              max={100}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={amortYears}
              onChange={(e) => setAmortYears(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={calculateMortgage} sx={{ mr: 2 }}>
              Calculate Mortgage
            </Button>
            <Button variant="outlined" onClick={resetMortgage}>
              Reset
            </Button>
          </Grid>
        </Grid>

        {Object.keys(mortgageResult).length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Results:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Down Payment: {mortgageResult.downPayment?.toFixed(2)}</Typography>
                <Typography>Loan Amount: {mortgageResult.loanAmount?.toFixed(2)}</Typography>
                <Typography>Monthly Payment: {mortgageResult.monthlyPayment?.toFixed(2)}</Typography>
                <Typography>Total Payment: {mortgageResult.totalPayment?.toFixed(2)}</Typography>
                <Typography>Total Interest: {mortgageResult.totalInterest?.toFixed(2)}</Typography>
                <Typography>Effective Interest Rate: {mortgageResult.effectiveRate?.toFixed(2)}%</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Disclaimer */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          <strong>Advisory Note:</strong> This Website is for <em>testing purposes only</em> and 
          should not be used for actual, real-life mortgage decisions. The results are purely 
          illustrative and may not account for all factors relevant to your personal financial situation.
        </Typography>
      </Alert>
    </Container>
  );
} 