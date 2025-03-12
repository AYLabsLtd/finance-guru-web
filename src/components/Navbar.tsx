import React from 'react';
import { Link as RouterLink, useLocation, LinkProps as RouterLinkProps } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const Logo = styled('img')({
  height: 50,
  width: 'auto',
  marginRight: 20,
});

interface NavButtonProps extends ButtonProps {
  to: string;
  component: typeof RouterLink;
}

const NavButton = styled(Button)<NavButtonProps>({
  color: '#fff',
  marginRight: 20,
  fontWeight: 600,
  fontSize: 16,
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default function Navbar() {
  const location = useLocation();
  const logoPath = `${import.meta.env.BASE_URL}imgs/logo.png`;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#005a9c', padding: '10px' }}>
      <Toolbar>
        <Logo src={logoPath} alt="Finance Guru" />
        <Box>
          <NavButton
            component={RouterLink}
            to="/"
            variant="text"
            sx={{
              textDecoration: location.pathname === '/' ? 'underline' : 'none',
            }}
          >
            Home
          </NavButton>
          <NavButton
            component={RouterLink}
            to="/mortgage"
            variant="text"
            sx={{
              textDecoration: location.pathname === '/mortgage' ? 'underline' : 'none',
            }}
          >
            Home Mortgage Calculator
          </NavButton>
          <NavButton
            component={RouterLink}
            to="/sip"
            variant="text"
            sx={{
              textDecoration: location.pathname === '/sip' ? 'underline' : 'none',
            }}
          >
            Systematic Investment Plan
          </NavButton>
          <NavButton
            component={RouterLink}
            to="/car-loan"
            variant="text"
            sx={{
              textDecoration: location.pathname === '/car-loan' ? 'underline' : 'none',
            }}
          >
            Car Loan Calculator
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 