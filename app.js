const express = require("express");
const path = require("path");

require("dotenv").config()

const app = express();

// Serve static files (optional, if you have CSS/JS)
app.use(express.static("public"));

// Serve an HTML page
app.get("/test", (req, res) => {
    res.send("testing testing levi fanpage");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));