import './header.css';
import logoWhite from '../components/images/Logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const CustomerToken = localStorage.getItem("CustomerToken");
  const SupplierToken = localStorage.getItem("SupplierToken");
  const AdminToken = localStorage.getItem("AdminToken");
  const Admin = JSON.parse(localStorage.getItem("admin") || '{}');
  const Supplier = JSON.parse(localStorage.getItem("supplier") || '{}');
  const Customer = JSON.parse(localStorage.getItem("Customer") || '{}');

  const handleLogout = () => {
    localStorage.removeItem("CustomerToken");
    localStorage.removeItem("Customer");
    localStorage.removeItem("SupplierToken");
    localStorage.removeItem("supplier");
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("CustomerData");
    navigate('/');
    window.location.reload();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };  const getCurrentUser = () => {
    if (CustomerToken) {
      console.log('Customer object:', Customer); // Debug log
      const customerName = Customer.fullName || Customer.name || Customer.firstName || 'Customer';
      return { name: customerName, type: 'Customer', dashboardPath: '/CustomerProfile' };
    }
    if (SupplierToken) {
      console.log('Supplier object:', Supplier); // Debug log
      const supplierName = Supplier.fullName || Supplier.name || Supplier.firstName || 'Supplier';
      return { name: supplierName, type: 'Supplier', dashboardPath: '/SuppDashboard' };
    }
    if (AdminToken) {
      console.log('Admin object:', Admin); // Debug log
      const adminName = Admin.fullName || Admin.name || Admin.firstName || 'Admin';
      return { name: adminName, type: 'Admin', dashboardPath: '/AdminDashboard' };
    }
    return null;
  };

  const currentUser = getCurrentUser();

  return (    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#10B981',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        width: '100%',
        overflow: 'hidden'
      }}
    ><Container maxWidth="xl" sx={{ width: '100%' }}>
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: '80px !important',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img 
                src={logoWhite} 
                alt="Bulkify Logo" 
                style={{ 
                  height: '50px', 
                  width: 'auto',
                  marginRight: '16px'
                }} 
              />
            </Link>
          </Box>       
          {/* Navigation Items */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexShrink: 0,
            position: 'relative'
          }}>
            {!currentUser ? (
              // Not logged in - show Login and Sign Up buttons
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={Link}
                  to="/Login"
                  variant={location.pathname === '/Login' ? 'contained' : 'outlined'}
                  startIcon={<LoginIcon />}
                  sx={{
                    color: location.pathname === '/Login' ? '#10B981' : 'white',
                    borderColor: 'white',
                    backgroundColor: location.pathname === '/Login' ? 'white' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/Signup"
                  variant={location.pathname === '/Signup' ? 'contained' : 'outlined'}
                  startIcon={<PersonAddIcon />}
                  sx={{
                    color: location.pathname === '/Signup' ? '#10B981' : 'white',
                    borderColor: 'white',
                    backgroundColor: location.pathname === '/Signup' ? 'white' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            ) : (              // Logged in - show user info and menu
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={`Welcome ${currentUser.name}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 32, height: 32 }}>
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{ 
                    '& .MuiPaper-root': {
                      minWidth: '180px',
                      maxWidth: '220px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5,
                        mr: 0
                      }
                    }
                  }}
                ><MenuItem 
                    disabled
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      opacity: 0.7,
                      fontStyle: 'italic'
                    }}
                  >
                    <AccountCircleIcon fontSize="small" />
                    {currentUser.type} Account
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    to={currentUser.dashboardPath}
                    onClick={handleMenuClose}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <DashboardIcon fontSize="small" />
                    Dashboard
                  </MenuItem>
                  <MenuItem 
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: 'error.main'
                    }}
                  >
                    <LogoutIcon fontSize="small" />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
