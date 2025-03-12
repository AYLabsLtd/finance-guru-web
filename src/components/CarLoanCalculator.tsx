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

interface CarLoanResult {
  downPayment?: number;
  loanAmount?: number;
  monthlyPayment?: number;
  totalPayment?: number;
  totalInterest?: number;
  effectiveRate?: number;
}

export default function CarLoanCalculator() {
  const { moneyAtHand, downPaymentForCar, useRestAsCarDownPayment } = useFinance();

  // Car loan section state
  const [carCost, setCarCost] = useState<number>(0);
  const [carPct, setCarPct] = useState<number>(20);
  const [annualInterest, setAnnualInterest] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [carLoanResult, setCarLoanResult] = useState<CarLoanResult>({});

  // Effect to update down payment percentage when car down payment changes
  useEffect(() => {
    if (downPaymentForCar > 0 && carCost > 0) {
      const pct = (downPaymentForCar / carCost) * 100;
      setCarPct(pct);
    }
  }, [downPaymentForCar, carCost]);

  // Effect to handle using rest money as car down payment
  useEffect(() => {
    if (useRestAsCarDownPayment === 'Yes' && moneyAtHand > 0) {
      const remainingMoney = moneyAtHand - downPaymentForCar;
      if (remainingMoney > 0 && carCost > 0) {
        const pct = (remainingMoney / carCost) * 100;
        setCarPct(pct);
      }
    }
  }, [useRestAsCarDownPayment, moneyAtHand, downPaymentForCar, carCost]);

  const calculateCarLoan = () => {
    const downPayment = downPaymentForCar || (carCost * (carPct / 100));
    const loanAmount = carCost - downPayment;
    const monthlyRate = (annualInterest / 100) / 12;
    const numPayments = loanTerm * 12;

    const monthlyPayment = loanAmount * (
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;
    const effectiveRate = ((totalPayment / loanAmount) - 1) * 100;

    setCarLoanResult({
      downPayment,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveRate,
    });
  };

  const resetCarLoan = () => {
    setCarCost(0);
    setCarPct(20);
    setAnnualInterest(5.5);
    setLoanTerm(5);
    setCarLoanResult({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Car Loan Calculator
      </Typography>

      {/* Top Section - Money Allocation */}
      <MoneyAllocation />

      {/* Car Loan Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Car Loan Details</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Car Cost"
              type="number"
              value={carCost || ''}
              onChange={(e) => setCarCost(Number(e.target.value))}
              placeholder="e.g. 500000"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Down Payment %</Typography>
            <Slider
              value={carPct}
              onChange={(_, value) => setCarPct(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
              disabled={downPaymentForCar > 0 || useRestAsCarDownPayment === 'Yes'}
            />
            <TextField
              fullWidth
              type="number"
              value={carPct}
              onChange={(e) => setCarPct(Number(e.target.value))}
              disabled={downPaymentForCar > 0 || useRestAsCarDownPayment === 'Yes'}
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
            <Typography gutterBottom>Loan Term (Years)</Typography>
            <Slider
              value={loanTerm}
              onChange={(_, value) => setLoanTerm(value as number)}
              min={1}
              max={10}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={calculateCarLoan} sx={{ mr: 2 }}>
              Calculate Car Loan
            </Button>
            <Button variant="outlined" onClick={resetCarLoan}>
              Reset
            </Button>
          </Grid>
        </Grid>

        {Object.keys(carLoanResult).length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Results:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Down Payment: {carLoanResult.downPayment?.toFixed(2)}</Typography>
                <Typography>Loan Amount: {carLoanResult.loanAmount?.toFixed(2)}</Typography>
                <Typography>Monthly Payment: {carLoanResult.monthlyPayment?.toFixed(2)}</Typography>
                <Typography>Total Payment: {carLoanResult.totalPayment?.toFixed(2)}</Typography>
                <Typography>Total Interest: {carLoanResult.totalInterest?.toFixed(2)}</Typography>
                <Typography>Effective Interest Rate: {carLoanResult.effectiveRate?.toFixed(2)}%</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Disclaimer */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          <strong>Advisory Note:</strong> This Website is for <em>demonstration purposes only</em> and 
          should not be used for actual, real-life car loan decisions. The results are purely 
          illustrative and may not account for all factors relevant to your personal financial situation.
        </Typography>
      </Alert>
    </Container>
  );
} 