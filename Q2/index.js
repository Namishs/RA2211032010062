import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 9876;
const WINDOW_SIZE = 10;
const API_BASE_URL = 'http://20.244.56.144/test';
const TIMEOUT = 500;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Store for numbers
let numberStore = [];

// Fetch numbers with timeout
async function fetchNumbersWithTimeout(type) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const endpoint = {
      'p': 'primes',
      'f': 'fibo',
      'e': 'even',
      'r': 'rand'
    }[type];

    if (!endpoint) {
      throw new Error('Invalid number type');
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.numbers;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

// Calculate average
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / numbers.length).toFixed(2));
}

// Update number store
function updateNumberStore(newNumbers) {
  // Remove duplicates and keep only unique numbers
  const uniqueNewNumbers = newNumbers.filter(num => !numberStore.includes(num));
  
  const prevState = [...numberStore];
  
  if (numberStore.length + uniqueNewNumbers.length <= WINDOW_SIZE) {
    numberStore = [...numberStore, ...uniqueNewNumbers];
  } else {
    // Replace oldest numbers with new ones while maintaining window size
    const spaceAvailable = WINDOW_SIZE - numberStore.length;
    if (spaceAvailable > 0) {
      numberStore = [...numberStore, ...uniqueNewNumbers.slice(0, spaceAvailable)];
    }
    const remaining = uniqueNewNumbers.slice(spaceAvailable);
    for (let i = 0; i < remaining.length && numberStore.length >= WINDOW_SIZE; i++) {
      numberStore = [...numberStore.slice(1), remaining[i]];
    }
  }

  return {
    prevState,
    currState: numberStore,
    newNumbers
  };
}

// Add a root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Average Calculator Service is running' });
});

app.get('/numbers/:type', async (req, res) => {
  const start = Date.now();
  
  try {
    const { type } = req.params;
    const numbers = await fetchNumbersWithTimeout(type);
    const { prevState, currState, newNumbers } = updateNumberStore(numbers);
    
    const response = {
      windowPrevState: prevState,
      windowCurrState: currState,
      numbers: newNumbers,
      avg: calculateAverage(currState)
    };

    // Ensure response time is within limits
    const processingTime = Date.now() - start;
    if (processingTime > TIMEOUT) {
      throw new Error('Processing timeout');
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      windowPrevState: numberStore,
      windowCurrState: numberStore,
      numbers: [],
      avg: calculateAverage(numberStore)
    });
  }
});

app.listen(port, () => {
  console.log(`Average Calculator service running on port ${port}`);
});