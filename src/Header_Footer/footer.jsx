import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './footer.css';
import logo from '../images/Layer_1.png';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import {
  Email as EmailIcon,
  Category as CategoryIcon,
  Link as LinkIcon,
  Info as InfoIcon
} from '@mui/icons-material';

function Footer() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories?limit=10000");
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        fetchCategories();
    }, []);    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#191C1F',
                color: 'white',
                py: 4,
                mt: 'auto',
                width: '100%'
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Main Footer Content */}
                <Grid container spacing={3} alignItems="flex-start">
                    {/* Company Info Section */}
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <img 
                                src={logo} 
                                alt="Bulkify Logo" 
                                style={{ 
                                    width: '120px', 
                                    height: '52px',
                                    marginBottom: '12px'
                                }} 
                            />
                            <Typography variant="body2" sx={{ color: '#ADB7BC', mb: 2, lineHeight: 1.5 }}>
                                Community-driven bulk purchasing platform for better deals.
                            </Typography>
                            <Typography
                                component="a"
                                href="mailto:admin@bulkify.com"
                                sx={{
                                    color: '#4FC3F7',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&:hover': {
                                        color: '#29B6F6',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                <EmailIcon fontSize="small" />
                                admin@bulkify.com
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Categories Section */}
                    <Grid item xs={12} md={6}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'white',
                                fontWeight: 'bold',
                                mb: 2,
                                fontSize: '18px'
                            }}
                        >
                            Categories
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: '120px',
                                overflow: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#10B981',
                                    borderRadius: '3px',
                                }
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: 1
                            }}>
                                {categories.slice(0, 12).map((category) => (
                                    <Chip
                                        key={category._id}
                                        label={category.name}
                                        component={Link}
                                        to={`/categories?category=${category.name}`}
                                        clickable
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            '&:hover': {
                                                backgroundColor: '#10B981',
                                                borderColor: '#10B981'
                                            },
                                            fontSize: '12px'
                                        }}
                                    />
                                ))}
                                {categories.length > 12 && (
                                    <Chip
                                        label={`+${categories.length - 12} more`}
                                        component={Link}
                                        to="/categories"
                                        clickable
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(97, 174, 69, 0.3)',
                                            color: '#10B981',
                                            border: '1px solid #10B981',
                                            fontWeight: 'bold',
                                            fontSize: '12px'
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Quick Links Section */}
                    <Grid item xs={12} md={3}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'white',
                                fontWeight: 'bold',
                                mb: 2,
                                fontSize: '18px'
                            }}
                        >
                            Quick Links
                        </Typography>
                        <Box sx={{ 
                            padding:1,
                            display: 'flex', 
                            flexDirection: { xs: 'row', md: 'column' },
                            flexWrap: 'wrap',
                            gap: 1
                        }}>
                            <Chip
                                label="Customer Help"
                                component="a"
                                href="mailto:admin@bulkify.com"
                                clickable
                                icon={<EmailIcon />}
                                sx={{
                                    backgroundColor: 'rgba(79, 195, 247, 0.2)',
                                    color: '#4FC3F7',
                                    border: '1px solid #4FC3F7',
                                    '&:hover': {
                                        backgroundColor: '#4FC3F7',
                                        color: 'white'
                                    },
                                    justifyContent: 'flex-start',
                                    width: { xs: 'auto', md: '100%' }
                                }}
                            />
                            <Chip
                                label="About Us"
                                component={Link}
                                to="/about-us"
                                clickable
                                icon={<InfoIcon />}
                                sx={{
                                    backgroundColor: 'rgba(255, 167, 38, 0.2)',
                                    color: '#FFA726',
                                    border: '1px solid #FFA726',
                                    '&:hover': {
                                        backgroundColor: '#FFA726',
                                        color: 'white'
                                    },
                                    justifyContent: 'flex-start',
                                    width: { xs: 'auto', md: '100%' }
                                }}
                            />
                            <Chip
                                label="Browse All"
                                component={Link}
                                to="/categories"
                                clickable
                                icon={<CategoryIcon />}
                                sx={{
                                    backgroundColor: 'rgba(129, 199, 132, 0.2)',
                                    color: '#81C784',
                                    border: '1px solid #81C784',
                                    '&:hover': {
                                        backgroundColor: '#81C784',
                                        color: 'white'
                                    },
                                    justifyContent: 'flex-start',
                                    width: { xs: 'auto', md: '100%' }
                                }}
                            />
                            <Chip
                                label="Login / Register"
                                component={Link}
                                to="/Login"
                                clickable
                                icon={<Typography sx={{ fontSize: '16px' }}>🔑</Typography>}
                                sx={{
                                    backgroundColor: 'rgba(144, 202, 249, 0.2)',
                                    color: '#90CAF9',
                                    border: '1px solid #90CAF9',
                                    '&:hover': {
                                        backgroundColor: '#90CAF9',
                                        color: 'white'
                                    },
                                    justifyContent: 'flex-start',
                                    width: { xs: 'auto', md: '100%' }
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Bottom Section */}
                <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2
                }}>
                    <Typography variant="body2" sx={{ color: '#ADB7BC' }}>
                        © {new Date().getFullYear()} Bulkify. All rights reserved.
                    </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        flexWrap: 'wrap',
                        margin: '8px',
                        justifyContent: { xs: 'center', sm: 'flex-end' }
                    }}>
                        <Chip 
                            label="Community Platform" 
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(97, 174, 69, 0.2)',
                                color: '#10B981',
                                border: '1px solid #10B981',
                                fontSize: '11px'
                            }}
                        />
                        <Chip 
                            label="Bulk Shopping" 
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(79, 195, 247, 0.2)',
                                color: '#4FC3F7',
                                border: '1px solid #4FC3F7',
                                fontSize: '11px'
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
