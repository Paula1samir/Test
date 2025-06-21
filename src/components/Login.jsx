import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  Stack,
  Card,
  CardContent,
  Avatar,
  Fade,
  CircularProgress
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
  PersonAdd,
  Business
} from "@mui/icons-material";
import AuthContext from "./context/AuthProvider";
import axios from "axios";
const Login_URL = "https://bulkify-back-end.vercel.app/api/v1/customers/login";
const suppLogin_URL = "https://bulkify-back-end.vercel.app/api/v1/suppliers/login";
const AdminLogin_URL = "https://bulkify-back-end.vercel.app/api/v1/admins/login";
export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrMsg(""); // Reset error message when email or password is modified
  }, [email, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setIsLoading(true);
  
    try {
      // Try customer login first
      const customerResponse = await axios.post(
        Login_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const token = customerResponse?.data?.token;
      const customer = customerResponse?.data?.customer;
  
      setAuth({ email, token });
      localStorage.setItem("Customer", JSON.stringify(customer));
      localStorage.setItem("CustomerToken", token);
      setIsLoading(false);
      navigate("/");
      return;
    } catch (customerErr) {
      // Updated error handling for customer login
      const errorMessage = customerErr.response?.data?.message || "Customer login failed";
      setErrMsg(errorMessage);
      if (customerErr.response?.status !== 401) {
        setIsLoading(false);
        return;
      }
    }
  
    try {
      // Try supplier login if customer login failed
      const supplierResponse = await axios.post(
        suppLogin_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const token = supplierResponse?.data?.token;
      const supplier = supplierResponse?.data?.supplier;
      const roles = supplierResponse?.data?.roles;
  
      setAuth({ email, token, roles });
      localStorage.setItem("supplier", JSON.stringify(supplier));
      localStorage.setItem("SupplierToken", token);
      setIsLoading(false);
      navigate("/SuppDashboard");
      return;
    } catch (supplierErr) {
      // Updated error handling for supplier login
      const errorMessage = supplierErr.response?.data?.message || "Supplier login failed";
      setErrMsg(errorMessage);
      if (supplierErr.response?.status !== 401) {
        setIsLoading(false);
        return;
      }
    }

    try {
      // Try admin login if both customer and supplier login failed
      const adminResponse = await axios.post(
        AdminLogin_URL,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = adminResponse?.data?.token;
      const admin = adminResponse?.data?.admin;
      const roles = adminResponse?.data?.roles;

      setAuth({ email, token, roles });
      localStorage.setItem("admin", JSON.stringify(admin));
      localStorage.setItem("AdminToken", token);
      setIsLoading(false);
      navigate("/AdminDashboard");
      return;
    } catch (adminErr) {
      // Updated error handling for admin login
      const errorMessage = adminErr.response?.data?.message || "Invalid credentials";
      setErrMsg(errorMessage);
      setIsLoading(false);
    }
  };  
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Fade in={true} timeout={800}>
        <Paper
          elevation={12}
          sx={{
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',              border: '1px solid rgba(16, 185, 129, 0.1)'
          }}
        >
          {/* Header Section */}
          <Box            sx={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              p: 4,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3
              }
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, position: 'relative', zIndex: 1 }}>
              Sign in to your Bulkify account
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Error Alert */}
            {errMsg && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': { color: '#d32f2f' }
                }}
                onClose={() => setErrMsg("")}
              >
                {errMsg}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Stack spacing={3}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#10B981' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#10B981',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10B981',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#10B981',
                    },
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#10B981' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#10B981' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#10B981',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10B981',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#10B981',
                    },
                  }}
                />

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: 'right' }}>
                  <Link 
                    to="/Forget-Password" 
                    style={{ 
                      color: '#10B981', 
                      textDecoration: 'none', 
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                {/* Login Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      boxShadow: '0 6px 25px rgba(16, 185, 129, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      background: '#ccc',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Divider */}
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?
                  </Typography>
                </Divider>

                {/* Sign Up Links */}
                <Stack spacing={2}>
                  <Button
                    component={Link}
                    to="/Signup"
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<PersonAdd />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: '#10B981',
                      color: '#10B981',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#059669',
                        backgroundColor: 'rgba(16, 185, 129, 0.05)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Sign Up as Customer
                  </Button>

                  <Button
                    component={Link}
                    to="/SupSignUp"
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<Business />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: '#ff9800',
                      color: '#ff9800',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#f57c00',
                        backgroundColor: 'rgba(255, 152, 0, 0.05)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Sign Up as Supplier
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Paper>
      </Fade>
    </Container>
  );
}
