const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const inventoryRoutes = require("./routes/inventory");
const warehouseRoutes = require("./routes/warehouse");
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/inventory", inventoryRoutes);
app.use("/warehouse", warehouseRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Instock Server side');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
