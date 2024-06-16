import { useState } from 'react'
import axios from 'axios';
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  Snackbar,
  Paper,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Clear, Error, SwapHoriz } from '@mui/icons-material';

const currencyOptions = [
  { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
  { code: 'BOB', name: 'Boliviano', symbol: 'Bs.' },
  { code: 'BRL', name: 'Real', symbol: 'R$' },
  { code: 'CAD', name: 'Dólar Canadiense', symbol: 'CA$' },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
  { code: 'CRC', name: 'Colón Costarricense', symbol: '₡' },
  { code: 'CUP', name: 'Peso Cubano', symbol: '$' },
  { code: 'DOP', name: 'Peso Dominicano', symbol: 'RD$' },
  { code: 'GTQ', name: 'Quetzal Guatemalteco', symbol: 'Q' },
  { code: 'GYD', name: 'Dólar Guyanés', symbol: 'G$' },
  { code: 'HNL', name: 'Lempira Hondureño', symbol: 'L' },
  { code: 'JMD', name: 'Dólar Jamaiquino', symbol: 'J$' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
  { code: 'NIO', name: 'Córdoba Nicaragüense', symbol: 'C$' },
  { code: 'PAB', name: 'Balboa Panameño', symbol: 'B/.' },
  { code: 'PYG', name: 'Guaraní Paraguayo', symbol: '₲' },
  { code: 'PEN', name: 'Sol Peruano', symbol: 'S/.' },
  { code: 'SRD', name: 'Dólar Surinamés', symbol: '$' },
  { code: 'TTD', name: 'Dólar de Trinidad y Tobago', symbol: 'TT$' },
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
  { code: 'UYU', name: 'Peso Uruguayo', symbol: '$U' },
  { code: 'VES', name: 'Bolívar Venezolano', symbol: 'Bs.' }
];


function App() {

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BOB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const handleConvert = () => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/5636095ce57fcae497e2c31b/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then(response => {
        const rates = response.data.conversion_rates;
        const rate = rates[toCurrency];

        if (rate) {
          const convertedAmount = amount * rate;
          setResult(convertedAmount.toFixed(2));
        } else {
          setError('No se encontró tasa de cambio para la moneda seleccionada.');
        }
      })
      .catch(error => {
        console.error('Error fetching the exchange rate:', error);
        setError('Hubo un problema al obtener la tasa de cambio. Por favor, intenta nuevamente más tarde.');
      });
  };

  const handleClear = () => {
    setAmount('');
    setFromCurrency('BOB');
    setToCurrency('USD');
    setResult('');
  };

  const handleCloseError = () => {
    setError(null);
  };

  const getCurrencySymbol = (code) => {
    const currency = currencyOptions.find(option => option.code === code);
    return currency ? currency.symbol : '';
  };
  return (
    <>
      <Container maxWidth="lg">
        <Box mt={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Conversor de Monedas Americanas
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper elevation={2} style={{ padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <TextField
                  select
                  label="De"
                  fullWidth
                  size='small'
                  margin="normal"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencyOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Para"
                  fullWidth
                  size='small'
                  margin="normal"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencyOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Monto"
                  type="number"
                  fullWidth
                  size='small'
                  margin="normal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <Box mt={2} >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConvert}
                    startIcon={<SwapHoriz />}
                    fullWidth
                  >
                    Convertir
                  </Button>
                </Box>

                <Box mt={2} >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClear}
                    startIcon={<Clear />}
                    fullWidth
                  >
                    Limpiar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper elevation={3} style={{ backgroundColor: '#e8f5e9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h2" align="center">
                  {result ? `${getCurrencySymbol(toCurrency)} ${result}` : '?'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseError}>
            <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleCloseError}>
              {error}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Container>

    </>
  )
}

export default App
