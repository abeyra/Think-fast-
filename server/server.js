require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const cors = require('cors');

app.use(cors());

const SERVER_PORT = process.env.PORT || 9000;

// Start up the app
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});