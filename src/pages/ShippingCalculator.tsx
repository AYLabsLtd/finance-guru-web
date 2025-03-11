import React, { useState } from 'react';
import { TextField, Typography, Grid } from '@mui/material';
import CalculatorLayout from '../components/CalculatorLayout';

interface ShippingRate {
  carrier: string;
  rate: number;
  estimatedDays: number;
}

function ShippingCalculator() {
  const [senderAddress, setSenderAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [shippingDate, setShippingDate] = useState('');
  const [weight, setWeight] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const calculateShipping = () => {
    if (!senderAddress || !destinationAddress || !shippingDate || !weight) {
      setResult('Please fill in all fields');
      return;
    }

    // Simulate API calls to different carriers
    const carriers: ShippingRate[] = [
      {
        carrier: 'Canada Post',
        rate: weight * 2.5 + 10,
        estimatedDays: 3,
      },
      {
        carrier: 'FedEx',
        rate: weight * 3 + 15,
        estimatedDays: 2,
      },
      {
        carrier: 'Purolator',
        rate: weight * 2.8 + 12,
        estimatedDays: 2,
      },
      {
        carrier: 'UPS',
        rate: weight * 3.2 + 14,
        estimatedDays: 2,
      },
      {
        carrier: 'USPS',
        rate: weight * 2.2 + 8,
        estimatedDays: 4,
      },
    ];

    const resultText = carriers
      .map(
        (rate) =>
          `${rate.carrier}:
  Rate: $${rate.rate.toFixed(2)}
  Estimated Delivery: ${rate.estimatedDays} business days`
      )
      .join('\n\n');

    setResult(resultText);
  };

  const resetForm = () => {
    setSenderAddress('');
    setDestinationAddress('');
    setShippingDate('');
    setWeight(0);
    setResult('');
  };

  return (
    <CalculatorLayout
      title="Shipping Package Calculator"
      onCalculate={calculateShipping}
      onReset={resetForm}
      result={
        result && (
          <Grid container spacing={2}>
            {result.split('\n\n').map((carrier, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography
                  component="div"
                  sx={{
                    p: 2,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    bgcolor: '#fff',
                  }}
                >
                  {carrier.split('\n').map((line, lineIndex) => (
                    <Typography
                      key={lineIndex}
                      variant="body1"
                      fontWeight={lineIndex === 0 ? 600 : 400}
                      sx={{ mb: 0.5 }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Sender Address"
            multiline
            rows={3}
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            fullWidth
            placeholder="Enter complete sender address"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Destination Address"
            multiline
            rows={3}
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            fullWidth
            placeholder="Enter complete destination address"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Shipping Date"
            type="date"
            value={shippingDate}
            onChange={(e) => setShippingDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight || ''}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            fullWidth
            placeholder="e.g. 2.5"
            inputProps={{ step: '0.1' }}
          />
        </Grid>
      </Grid>
    </CalculatorLayout>
  );
}

export default ShippingCalculator; 