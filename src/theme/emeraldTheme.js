import { createTheme } from '@mui/material/styles';

// Create a custom Material-UI theme with emerald green colors
export const emeraldTheme = createTheme({
  palette: {
    success: {
      main: '#10B981',      // Primary emerald green
      dark: '#047857',      // Darker emerald green
      light: '#34D399',     // Lighter emerald green
      contrastText: '#fff', // White text for contrast
    },
    primary: {
      main: '#10B981',      // Use emerald as primary too
      dark: '#047857',
      light: '#34D399',
      contrastText: '#fff',
    },
  },
  components: {
    // Override Button component defaults
    MuiButton: {
      styleOverrides: {
        root: {
          // Ensure our emerald colors are used
          '&.MuiButton-containedSuccess': {
            backgroundColor: '#10B981',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#059669',
            },
            '&:active': {
              backgroundColor: '#047857',
            },
          },
          '&.MuiButton-outlinedSuccess': {
            color: '#10B981',
            borderColor: '#10B981',
            '&:hover': {
              backgroundColor: 'rgba(16, 185, 129, 0.04)',
              borderColor: '#059669',
            },
          },
        },
      },
    },
    // Override Pagination component
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: '#10B981',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#059669',
              },
            },
          },
        },
      },
    },
    // Override Chip component
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-colorSuccess': {
            backgroundColor: '#10B981',
            color: '#fff',
          },
        },
      },
    },
  },
});

export default emeraldTheme;
