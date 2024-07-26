    const express = require('express');
    const axios = require('axios');

    const app = express();
    const PORT = 9876;
    const WINDOW_SIZE = 10;

    let numbers = [];

    // Fetch numbers from the third-party server
    const fetchNumbers = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching numbers from ${url}:`, error);
        return [];
    }
    };

    // Calculate the average of an array of numbers
    const calculateAverage = (nums) => {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((a, b) => a + b, 0);
    return sum / nums.length;
    };

    // API endpoint to handle number requests
    app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    let url;

    switch(type) {
        case 'prime':
        url = 'http://20.244.56.144/test/primes';
        break;
        case 'fibo':
        url = 'http://20.244.56.144/test/fibo';
        break;
        case 'even':
        url = 'http://20.244.56.144/test/even';
        break;
        case 'rand':
        url = 'http://20.244.56.144/test/rand';
        break;
        default:
        return res.status(400).json({ error: 'Invalid number type' });
    }

    const newNumbers = await fetchNumbers(url);
    const uniqueNewNumbers = [...new Set(newNumbers)];

    numbers = [...new Set([...numbers, ...uniqueNewNumbers])].slice(-WINDOW_SIZE);

    const average = calculateAverage(numbers);

    res.json({
        windowPrevState: numbers.slice(0, -uniqueNewNumbers.length),
        windowCurrState: numbers,
        numbers: numbers,
        avg: average
    });
    });

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
