import { useState } from 'react';
import { TextField, Typography, Grid } from '@mui/material';
import CalculatorLayout from '../components/CalculatorLayout';
import RangeSlider from '../components/RangeSlider';

function SIPCalculator() {
  const [lumpsum, setLumpsum] = useState<number>(0);
  const [sipTerm, setSipTerm] = useState<number>(5);
  const [sipInterest, setSipInterest] = useState<number>(12);
  const [ltcgTax, setLtcgTax] = useState<number>(10);
  const [result, setResult] = useState<string>('');

  const calculateSIP = () => {
    if (!lumpsum) {
      setResult('Please enter the lump sum amount');
      return;
    }

    const monthlyRate = sipInterest / 100 / 12;
    const numberOfMonths = sipTerm * 12;

    // Calculate future value using compound interest formula
    const futureValue = lumpsum * Math.pow(1 + monthlyRate, numberOfMonths);
    
    // Calculate total returns
    const totalReturns = futureValue - lumpsum;
    
    // Calculate tax on gains
    const taxAmount = totalReturns * (ltcgTax / 100);
    
    // Calculate final amount after tax
    const finalAmount = futureValue - taxAmount;

    setResult(`
      Initial Investment: $${lumpsum.toFixed(2)}
      Future Value (Before Tax): $${futureValue.toFixed(2)}
      Total Returns: $${totalReturns.toFixed(2)}
      Tax Amount (${ltcgTax}%): $${taxAmount.toFixed(2)}
      Final Amount (After Tax): $${finalAmount.toFixed(2)}
    `);
  };

  const resetForm = () => {
    setLumpsum(0);
    setSipTerm(5);
    setSipInterest(12);
    setLtcgTax(10);
    setResult('');
  };

  return (
    <CalculatorLayout
      title="Systematic Investment Plan"
      onCalculate={calculateSIP}
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
            label="Lump Sum Amount"
            type="number"
            value={lumpsum || ''}
            onChange={(e) => setLumpsum(parseFloat(e.target.value) || 0)}
            fullWidth
            placeholder="e.g. 100000"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Investment Period"
            value={sipTerm}
            onChange={setSipTerm}
            min={1}
            max={30}
            step={1}
            unit="years"
            placeholder="e.g. 5"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Expected Return Rate (Annual)"
            value={sipInterest}
            onChange={setSipInterest}
            min={0}
            max={30}
            step={0.1}
            unit="%"
            placeholder="e.g. 12"
          />
        </Grid>

        <Grid item xs={12}>
          <RangeSlider
            label="Long Term Capital Gains Tax"
            value={ltcgTax}
            onChange={setLtcgTax}
            min={0}
            max={40}
            step={0.1}
            unit="%"
            placeholder="e.g. 10"
          />
        </Grid>
      </Grid>
    </CalculatorLayout>
  );
}

export default SIPCalculator; 