import { ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Link, Box, Container, styled } from '@mui/material';

const Logo = styled('img')({
  height: 50,
  marginRight: 20,
});

const NavLink = styled(Link)({
  color: '#fff',
  textDecoration: 'none',
  marginRight: 20,
  fontWeight: 600,
  fontSize: 16,
  '&:hover': {
    textDecoration: 'underline',
  },
});

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Logo src="/imgs/logo.png" alt="Finance Guru Logo" />
          <NavLink
            component={RouterLink}
            to="/"
            sx={{ textDecoration: location.pathname === '/' ? 'underline' : 'none' }}
          >
            Home
          </NavLink>
          <NavLink
            component={RouterLink}
            to="/mortgage"
            sx={{ textDecoration: location.pathname === '/mortgage' ? 'underline' : 'none' }}
          >
            Home Mortgage Calculator
          </NavLink>
          <NavLink
            component={RouterLink}
            to="/sip"
            sx={{ textDecoration: location.pathname === '/sip' ? 'underline' : 'none' }}
          >
            Systematic Investment Plan
          </NavLink>
          <NavLink
            component={RouterLink}
            to="/car-loan"
            sx={{ textDecoration: location.pathname === '/car-loan' ? 'underline' : 'none' }}
          >
            Car Loan Calculator
          </NavLink>
          <NavLink
            component={RouterLink}
            to="/shipping"
            sx={{ textDecoration: location.pathname === '/shipping' ? 'underline' : 'none' }}
          >
            Shipping Package
          </NavLink>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout; 