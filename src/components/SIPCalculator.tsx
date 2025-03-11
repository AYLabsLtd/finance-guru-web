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

interface SIPResult {
  totalInvested?: number;
  valuationEnd?: number;
  profit?: number;
  valueAfterTax?: number;
  actualProfit?: number;
  cagr?: number;
  presentValue?: number;
  realRate?: number;
}

export default function SIPCalculator() {
  const { moneyAtHand, downPaymentOptional, useRestAsLumpSumSip } = useFinance();

  // Lump Sum SIP state
  const [lumpsum, setLumpsum] = useState<number>(0);
  const [sipTerm, setSipTerm] = useState<number>(1);
  const [sipInterest, setSipInterest] = useState<number>(0);
  const [ltcgTax, setLtcgTax] = useState<number>(0);
  const [inflation, setInflation] = useState<number>(0);
  const [lumpsumResult, setLumpsumResult] = useState<SIPResult>({});

  // Monthly SIP state
  const [monthlySIP, setMonthlySIP] = useState<number>(0);
  const [monthlyTerm, setMonthlyTerm] = useState<number>(1);
  const [monthlySipInterest, setMonthlySipInterest] = useState<number>(0);
  const [monthlyLtcgTax, setMonthlyLtcgTax] = useState<number>(0);
  const [monthlyInflation, setMonthlyInflation] = useState<number>(0);
  const [monthlySipResult, setMonthlySipResult] = useState<SIPResult>({});

  // Effect to update lumpsum when money allocation changes
  useEffect(() => {
    if (useRestAsLumpSumSip === 'Yes') {
      const remainingMoney = moneyAtHand - downPaymentOptional;
      setLumpsum(remainingMoney > 0 ? remainingMoney : 0);
    }
  }, [moneyAtHand, downPaymentOptional, useRestAsLumpSumSip]);

  const calculateLumpSumSIP = () => {
    const annualRate = sipInterest / 100;
    const taxRate = ltcgTax / 100;
    const inflationRate = inflation / 100;

    const valuationEnd = lumpsum * Math.pow(1 + annualRate, sipTerm);
    const profit = valuationEnd - lumpsum;
    const valueAfterTax = lumpsum + (profit * (1 - taxRate));
    const actualProfit = valueAfterTax - lumpsum;
    const cagr = (lumpsum > 0 && sipTerm > 0)
      ? Math.pow(valuationEnd / lumpsum, 1 / sipTerm) - 1
      : 0;

    const presentValue = valueAfterTax / Math.pow(1 + inflationRate, sipTerm);
    const realRate = ((1 + cagr) / (1 + inflationRate)) - 1;

    setLumpsumResult({
      totalInvested: lumpsum,
      valuationEnd,
      profit,
      valueAfterTax,
      actualProfit,
      cagr,
      presentValue,
      realRate
    });
  };

  const calculateMonthlySIP = () => {
    const annualRate = monthlySipInterest / 100;
    const monthlyRate = annualRate / 12;
    const taxRate = monthlyLtcgTax / 100;
    const inflationRate = monthlyInflation / 100;
    const n = monthlyTerm * 12;

    const totalInvested = monthlySIP * n;
    const valuationEnd = (monthlyRate > 0)
      ? monthlySIP * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate)
      : totalInvested;
    const profit = valuationEnd - totalInvested;
    const valueAfterTax = totalInvested + (profit * (1 - taxRate));
    const actualProfit = valueAfterTax - totalInvested;

    const approximateYears = monthlyTerm - 0.5;
    const cagr = (approximateYears > 0 && totalInvested > 0)
      ? Math.pow(valueAfterTax / (totalInvested / 2), 1 / approximateYears) - 1
      : 0;

    const presentValue = valueAfterTax / Math.pow(1 + inflationRate, monthlyTerm);
    const realRate = ((1 + cagr) / (1 + inflationRate)) - 1;

    setMonthlySipResult({
      totalInvested,
      valuationEnd,
      profit,
      valueAfterTax,
      actualProfit,
      cagr,
      presentValue,
      realRate
    });
  };

  const resetLumpSumSIP = () => {
    setLumpsum(0);
    setSipTerm(1);
    setSipInterest(0);
    setLtcgTax(0);
    setInflation(0);
    setLumpsumResult({});
  };

  const resetMonthlySIP = () => {
    setMonthlySIP(0);
    setMonthlyTerm(1);
    setMonthlySipInterest(0);
    setMonthlyLtcgTax(0);
    setMonthlyInflation(0);
    setMonthlySipResult({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Systematic Investment Plan
      </Typography>

      {/* Top Section - Money Allocation */}
      <MoneyAllocation />

      {/* Lump Sum SIP Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>SIP Lump Sum (Tax & Inflation)</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Lump Sum SIP"
              type="number"
              value={lumpsum || ''}
              onChange={(e) => setLumpsum(Number(e.target.value))}
              disabled={useRestAsLumpSumSip === 'Yes'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>SIP Term (Years)</Typography>
            <Slider
              value={sipTerm}
              onChange={(_, value) => setSipTerm(value as number)}
              min={1}
              max={100}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={sipTerm}
              onChange={(e) => setSipTerm(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>SIP Interest Rate (Annual %)</Typography>
            <Slider
              value={sipInterest}
              onChange={(_, value) => setSipInterest(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={sipInterest}
              onChange={(e) => setSipInterest(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Long Term Cap Gains Tax (%)</Typography>
            <Slider
              value={ltcgTax}
              onChange={(_, value) => setLtcgTax(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={ltcgTax}
              onChange={(e) => setLtcgTax(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Inflation Rate (Annual %)</Typography>
            <Slider
              value={inflation}
              onChange={(_, value) => setInflation(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={calculateLumpSumSIP} sx={{ mr: 2 }}>
              Calculate Lump Sum SIP
            </Button>
            <Button variant="outlined" onClick={resetLumpSumSIP}>
              Reset
            </Button>
          </Grid>
        </Grid>

        {Object.keys(lumpsumResult).length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Results:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Lump Sum SIP used: {lumpsumResult.totalInvested?.toFixed(2)}</Typography>
                <Typography>Valuation at End: {lumpsumResult.valuationEnd?.toFixed(2)}</Typography>
                <Typography>Profit: {lumpsumResult.profit?.toFixed(2)}</Typography>
                <Typography>Value after Tax: {lumpsumResult.valueAfterTax?.toFixed(2)}</Typography>
                <Typography>Actual Profit: {lumpsumResult.actualProfit?.toFixed(2)}</Typography>
                <Typography>CAGR: {(lumpsumResult.cagr! * 100).toFixed(2)}%</Typography>
                <Typography>Present Value (Inflation adjusted): {lumpsumResult.presentValue?.toFixed(2)}</Typography>
                <Typography>Real Rate of Return: {(lumpsumResult.realRate! * 100).toFixed(2)}%</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Monthly SIP Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Monthly SIP (Tax & Inflation)</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Monthly SIP"
              type="number"
              value={monthlySIP || ''}
              onChange={(e) => setMonthlySIP(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Term (Years)</Typography>
            <Slider
              value={monthlyTerm}
              onChange={(_, value) => setMonthlyTerm(value as number)}
              min={1}
              max={100}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={monthlyTerm}
              onChange={(e) => setMonthlyTerm(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Interest Rate (Annual %)</Typography>
            <Slider
              value={monthlySipInterest}
              onChange={(_, value) => setMonthlySipInterest(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={monthlySipInterest}
              onChange={(e) => setMonthlySipInterest(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Long Term Cap Gains Tax (%)</Typography>
            <Slider
              value={monthlyLtcgTax}
              onChange={(_, value) => setMonthlyLtcgTax(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={monthlyLtcgTax}
              onChange={(e) => setMonthlyLtcgTax(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Inflation Rate (Annual %)</Typography>
            <Slider
              value={monthlyInflation}
              onChange={(_, value) => setMonthlyInflation(value as number)}
              min={0}
              max={100}
              step={0.01}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={monthlyInflation}
              onChange={(e) => setMonthlyInflation(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={calculateMonthlySIP} sx={{ mr: 2 }}>
              Calculate Monthly SIP
            </Button>
            <Button variant="outlined" onClick={resetMonthlySIP}>
              Reset
            </Button>
          </Grid>
        </Grid>

        {Object.keys(monthlySipResult).length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Results:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Total Money Invested: {monthlySipResult.totalInvested?.toFixed(2)}</Typography>
                <Typography>Valuation at End: {monthlySipResult.valuationEnd?.toFixed(2)}</Typography>
                <Typography>Profit: {monthlySipResult.profit?.toFixed(2)}</Typography>
                <Typography>Value after Tax: {monthlySipResult.valueAfterTax?.toFixed(2)}</Typography>
                <Typography>Actual Profit: {monthlySipResult.actualProfit?.toFixed(2)}</Typography>
                <Typography>Approx. CAGR: {(monthlySipResult.cagr! * 100).toFixed(2)}%</Typography>
                <Typography>Present Value (Inflation adjusted): {monthlySipResult.presentValue?.toFixed(2)}</Typography>
                <Typography>Real Rate of Return: {(monthlySipResult.realRate! * 100).toFixed(2)}%</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Disclaimer */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          <strong>Advisory Note:</strong> This Website is for <em>testing purposes only</em> and should not be used for actual, real-life mortgage or SIP decisions. The results are purely illustrative and may not account for all factors relevant to your personal financial situation.
        </Typography>
      </Alert>
    </Container>
  );
} 