import { useState } from 'react';
import { TextField, Typography, Grid } from '@mui/material';
import CalculatorLayout from '../components/CalculatorLayout';
import RangeSlider from '../components/RangeSlider';

function CarLoanCalculator() {
  const [carCost, setCarCost] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [result, setResult] = useState<string>('');

  const calculateCarLoan = () => {
    if (!carCost) {
      setResult('Please enter the car cost');
      return;
    }

    if (downPayment >= carCost) {
      setResult('Down payment cannot be greater than or equal to car cost');
      return;
    }

    const principal = carCost - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult(`
      Car Cost: $${carCost.toFixed(2)}
      Down Payment: $${downPayment.toFixed(2)}
      Loan Amount: $${principal.toFixed(2)}
      Monthly Payment: $${monthlyPayment.toFixed(2)}
      Total Payment: $${totalPayment.toFixed(2)}
      Total Interest: $${totalInterest.toFixed(2)}
    `);
  };

  const resetForm = () => {
    setCarCost(0);
    setDownPayment(0);
    setInterestRate(5);
    setLoanTerm(5);
    setResult('');
  };

  return (
    <CalculatorLayout
      title="Car Loan Calculator"
      onCalculate={calculateCarLoan}
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
            label="Car Cost"
            type="number"
            value={carCost || ''}
            onChange={(e) => setCarCost(parseFloat(e.target.value) || 0)}
            fullWidth
            placeholder="e.g. 30000"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Down Payment"
            type="number"
            value={downPayment || ''}
            onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
            fullWidth
            placeholder="e.g. 5000"
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
            placeholder="e.g. 5"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Loan Period"
            value={loanTerm}
            onChange={setLoanTerm}
            min={1}
            max={10}
            step={1}
            unit="years"
            placeholder="e.g. 5"
          />
        </Grid>
      </Grid>
    </CalculatorLayout>
  );
}

export default CarLoanCalculator; 