import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useFinance } from '../context/FinanceContext';

export default function MoneyAllocation() {
  const {
    moneyAtHand,
    setMoneyAtHand,
    downPaymentOptional,
    setDownPaymentOptional,
    useRestAsLumpSumSip,
    setUseRestAsLumpSumSip,
    downPaymentForCar,
    setDownPaymentForCar,
    useRestAsCarDownPayment,
    setUseRestAsCarDownPayment,
    resetAllValues,
  } = useFinance();

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Money Allocation</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Money at hand"
            type="number"
            value={moneyAtHand || ''}
            onChange={(e) => setMoneyAtHand(Number(e.target.value))}
            placeholder="e.g. 100000"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Money for Down Payment (Optional)"
            type="number"
            value={downPaymentOptional || ''}
            onChange={(e) => setDownPaymentOptional(Number(e.target.value))}
            placeholder="e.g. 20000"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Use rest as Lump Sum SIP?</InputLabel>
            <Select
              value={useRestAsLumpSumSip}
              label="Use rest as Lump Sum SIP?"
              onChange={(e) => setUseRestAsLumpSumSip(e.target.value)}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Down payment for car"
            type="number"
            value={downPaymentForCar || ''}
            onChange={(e) => setDownPaymentForCar(Number(e.target.value))}
            placeholder="e.g. 5000"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Use rest as car down payment?</InputLabel>
            <Select
              value={useRestAsCarDownPayment}
              label="Use rest as car down payment?"
              onChange={(e) => setUseRestAsCarDownPayment(e.target.value)}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={resetAllValues} sx={{ mr: 2 }}>
            Reset All
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
} 