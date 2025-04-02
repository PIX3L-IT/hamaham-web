const express = require("express");
const path = require("path");

const app = express();

// Serve static files (optional, if you have CSS/JS)
app.use(express.static("public"));

// Serve an HTML page
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "test.html"));
});

// Start server
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));