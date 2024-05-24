const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const inventoryRoutes = require("./routes/inventories");
const warehouseRoutes = require("./routes/warehouses");
// Load environment variables from .env file
dotenv.config();

const app = express();
require("dotenv").config();  //load .env variable
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use("/api/inventories", inventoryRoutes);
app.use("/api/warehouses", warehouseRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Instock Server side');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
