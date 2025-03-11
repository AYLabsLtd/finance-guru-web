import { ReactNode } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';

interface CalculatorLayoutProps {
  title: string;
  children: ReactNode;
  onCalculate?: () => void;
  onReset?: () => void;
  result?: ReactNode;
}

function CalculatorLayout({
  title,
  children,
  onCalculate,
  onReset,
  result,
}: CalculatorLayoutProps) {
  return (
    <Box>
      <Typography variant="h4" component="h1" textAlign="center" mb={4}>
        {title}
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        {children}

        {(onCalculate || onReset) && (
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {onCalculate && (
              <Button
                variant="contained"
                color="secondary"
                onClick={onCalculate}
                sx={{ minWidth: 120 }}
              >
                Calculate
              </Button>
            )}
            {onReset && (
              <Button
                variant="contained"
                color="error"
                onClick={onReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
            )}
          </Box>
        )}

        {result && (
          <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            {result}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CalculatorLayout; 