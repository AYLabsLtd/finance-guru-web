import React from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

const HomeContainer = styled(Container)({
  textAlign: 'center',
  padding: '60px 20px',
  maxWidth: 800,
  margin: '0 auto',
});

const Title = styled(Typography)({
  fontSize: '2.2rem',
  marginBottom: '20px',
});

const Description = styled(Typography)({
  fontSize: '1.2rem',
  marginBottom: '16px',
  lineHeight: 1.5,
});

export default function Home() {
  return (
    <HomeContainer>
      <Title variant="h1">Welcome to Finance Guru</Title>
      
      <Description>
        This website is designed to help you explore various aspects 
        of financial planning. Whether you're looking to estimate your 
        mortgage payments or project future investment returns, we aim 
        to provide simple yet illustrative tools that can make the 
        process clearer.
      </Description>

      <Description>
        By clicking on the "Home Mortgage Calculator" tab above, you'll find 
        a suite of calculators covering mortgage and housing costs, SIP 
        (Systematic Investment Plan) predictions, and more. These tools 
        allow you to input a range of parameters—like annual interest rates, 
        down payment amounts, and inflation estimates—and instantly see 
        how changes in these factors can affect your overall financial picture.
      </Description>

      <Description>
        By clicking on the "Systematic Investment Plan" tab above, you'll find 
        tools to help you calculate and plan your systematic investments. 
        This calculator allows you to input parameters like investment amount, 
        interest rates, and investment duration to see potential returns and 
        growth over time.
      </Description>

      <Description>
        By clicking on the "Car Loan Calculator" tab above, you'll find 
        tools to help you calculate your car loan payments and total costs. 
        This calculator helps you understand how different down payments, 
        interest rates, and loan terms affect your monthly payments and 
        total interest paid.
      </Description>

      <Description>
        Please note that these calculators are for <em>testing purposes only</em> 
        and should not replace the advice of a certified financial professional. 
        We hope they serve as a helpful starting point for your financial 
        planning or learning journey.
      </Description>

      {/* Disclaimer */}
      <Box sx={{ width: '60%', margin: '20px auto', textAlign: 'center' }}>
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Advisory Note:</strong> This Website is for <em>testing purposes only</em> and 
            should not be used for actual, real-life mortgage or SIP decisions. The results are 
            purely illustrative and may not account for all factors relevant to your personal 
            financial situation.
          </Typography>
        </Alert>
      </Box>
    </HomeContainer>
  );
} 