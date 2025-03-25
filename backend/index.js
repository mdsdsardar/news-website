const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Sample API endpoint
app.get("/api/news", (req, res) => {
  res.json([{ title: "Breaking News!", content: "Some content here." }]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

