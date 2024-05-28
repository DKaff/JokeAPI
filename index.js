const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to interact with the JokeAPI
app.get('/', async (req, res) => {
  try {
    // Make HTTP request to the JokeAPI
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');

    // Extract relevant data from the API response
    const joke = response.data.joke;

    // Render the joke to the index.ejs template
    res.render('index', { joke });
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).render('error', { message: 'An error occurred while fetching the joke. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
