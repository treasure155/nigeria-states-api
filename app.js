const express = require('express');
const cors = require('cors');
const statesRoutes = require('./routes/states');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/states', statesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


