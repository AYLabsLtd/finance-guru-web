import { Typography, Paper, Box } from '@mui/material';

function Home() {
  return (
    <Box>
      <Typography variant="h3" component="h1" textAlign="center" mb={3}>
        Welcome to Finance Guru
      </Typography>
      
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" paragraph>
          This website is designed to help you explore various aspects of financial planning. 
          Whether you're looking to estimate your mortgage payments or project future investment returns, 
          we aim to provide simple yet illustrative tools that can make the process clearer.
        </Typography>

        <Typography variant="body1" paragraph>
          By clicking on the "Home Mortgage Calculator" tab above, you'll find a suite of calculators 
          covering mortgage and housing costs. These tools allow you to input a range of parameters—like 
          annual interest rates, down payment amounts, and loan terms—and instantly see how changes in 
          these factors can affect your overall financial picture.
        </Typography>

        <Typography variant="body1" paragraph>
          The "Systematic Investment Plan" calculator helps you understand the power of systematic 
          investing. Input your investment amount, time period, and expected returns to see how your 
          wealth could grow over time.
        </Typography>

        <Typography variant="body1" paragraph>
          Our "Car Loan Calculator" helps you estimate monthly payments and total costs when financing 
          a vehicle. Compare different scenarios with varying down payments, interest rates, and loan terms.
        </Typography>

        <Typography variant="body1" paragraph>
          The "Shipping Package" calculator helps you compare shipping costs across different carriers. 
          Enter package details and addresses to get estimated costs and delivery times.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" textAlign="center">
          Advisory Note: This Website is for testing purposes only and should not be used for actual, 
          real-life financial decisions. The results are purely illustrative and may not account for 
          all factors relevant to your personal financial situation.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Home; 