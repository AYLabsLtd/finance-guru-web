import { useState } from 'react';
import { TextField, Typography, Grid } from '@mui/material';
import CalculatorLayout from '../components/CalculatorLayout';
import RangeSlider from '../components/RangeSlider';

function MortgageCalculator() {
  const [houseCost, setHouseCost] = useState<number>(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [amortizationYears, setAmortizationYears] = useState<number>(20);
  const [result, setResult] = useState<string>('');

  const calculateMortgage = () => {
    if (!houseCost) {
      setResult('Please enter the house cost');
      return;
    }

    const principal = houseCost * (1 - downPaymentPercent / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = amortizationYears * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult(`
      Down Payment: $${(houseCost * (downPaymentPercent / 100)).toFixed(2)}
      Loan Amount: $${principal.toFixed(2)}
      Monthly Payment: $${monthlyPayment.toFixed(2)}
      Total Payment: $${totalPayment.toFixed(2)}
      Total Interest: $${totalInterest.toFixed(2)}
    `);
  };

  const resetForm = () => {
    setHouseCost(0);
    setDownPaymentPercent(20);
    setInterestRate(7.5);
    setAmortizationYears(20);
    setResult('');
  };

  return (
    <CalculatorLayout
      title="Home Mortgage Calculator"
      onCalculate={calculateMortgage}
      onReset={resetForm}
      result={
        result && (
          <Grid container spacing={2}>
            {result.split('\n').map((line, index) => (
              line.trim() && (
                <Grid item xs={12} key={index}>
                  <Typography variant="body1" fontWeight={index === 0 ? 400 : 600}>
                    {line}
                  </Typography>
                </Grid>
              )
            ))}
          </Grid>
        )
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="House Cost"
            type="number"
            value={houseCost || ''}
            onChange={(e) => setHouseCost(parseFloat(e.target.value) || 0)}
            fullWidth
            placeholder="e.g. 500000"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Down Payment"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={100}
            step={0.1}
            unit="%"
            placeholder="e.g. 20"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Interest Rate (Annual)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={20}
            step={0.1}
            unit="%"
            placeholder="e.g. 7.5"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Amortization Period"
            value={amortizationYears}
            onChange={setAmortizationYears}
            min={1}
            max={30}
            step={1}
            unit="years"
            placeholder="e.g. 20"
          />
        </Grid>
      </Grid>
    </CalculatorLayout>
  );
}

export default MortgageCalculator; 